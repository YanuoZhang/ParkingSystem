const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Supabase 数据库连接
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// 连接数据库
client.connect()
  .then(() => {
    console.log('✅ Connected to Supabase database');
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });

// Middleware
app.use(cors({
  origin: 'https://parking-system-topaz.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Load mock data from JSON files
const loadData = (filename) => {
  try {
    const dataPath = path.join(__dirname, 'data', filename);
    const rawData = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return [];
  }
};

const parkingSpots = loadData('parking-spots.json');
const parkingInsights = loadData('insights.json');

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Melbourne Parking API is running!' });
});

// Population 数据相关路由
app.get('/api/population', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM melbourne_population ORDER BY year');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching population data:', error);
    res.status(500).json({ message: 'Error fetching population data' });
  }
});

app.get('/api/population/:year', async (req, res) => {
  try {
    const { year } = req.params;
    
    const result = await client.query('SELECT * FROM melbourne_population WHERE year = $1', [year]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Population data not found for this year' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching population data by year:', error);
    res.status(500).json({ message: 'Error fetching population data' });
  }
});

app.post('/api/population', async (req, res) => {
  try {
    const { year, population } = req.body;
    
    const result = await client.query(
      'INSERT INTO melbourne_population (year, population) VALUES ($1, $2) RETURNING *',
      [year, population]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating population data:', error);
    res.status(500).json({ message: 'Error creating population data' });
  }
});

app.put('/api/population/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const { population } = req.body;
    
    const result = await client.query(
      'UPDATE melbourne_population SET population = $1 WHERE year = $2 RETURNING *',
      [population, year]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Population data not found for this year' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating population data:', error);
    res.status(500).json({ message: 'Error updating population data' });
  }
});

app.delete('/api/population/:year', async (req, res) => {
  try {
    const { year } = req.params;
    
    const result = await client.query('DELETE FROM melbourne_population WHERE year = $1 RETURNING *', [year]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Population data not found for this year' });
    }
    
    res.json({ message: 'Population data deleted successfully' });
  } catch (error) {
    console.error('Error deleting population data:', error);
    res.status(500).json({ message: 'Error deleting population data' });
  }
});

// Get all parking spots
app.get('/api/parking-spots', (req, res) => {
  res.json(parkingSpots);
});

// Get parking spot by ID
app.get('/api/parking-spots/:id', (req, res) => {
  const spot = parkingSpots.find(s => s.id === parseInt(req.params.id));
  if (!spot) {
    return res.status(404).json({ message: 'Parking spot not found' });
  }
  res.json(spot);
});

// Search parking spots
app.get('/api/parking-spots/search', (req, res) => {
  const { query, maxPrice, availableOnly } = req.query;
  
  let filteredSpots = parkingSpots;
  
  if (query) {
    filteredSpots = filteredSpots.filter(spot => 
      spot.name.toLowerCase().includes(query.toLowerCase()) ||
      spot.address.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  if (maxPrice) {
    filteredSpots = filteredSpots.filter(spot => spot.hourlyRate <= parseFloat(maxPrice));
  }
  
  if (availableOnly === 'true') {
    filteredSpots = filteredSpots.filter(spot => spot.availableSpots > 0);
  }
  
  res.json(filteredSpots);
});

// Get parking insights
app.get('/api/insights', (req, res) => {
  res.json(parkingInsights);
});

// Get specific insight
app.get('/api/insights/:id', (req, res) => {
  const insight = parkingInsights.find(i => i.id === parseInt(req.params.id));
  if (!insight) {
    return res.status(404).json({ message: 'Insight not found' });
  }
  res.json(insight);
});

// Book a parking spot
app.post('/api/parking-spots/:id/book', (req, res) => {
  const { duration, startTime } = req.body;
  const spot = parkingSpots.find(s => s.id === parseInt(req.params.id));
  
  if (!spot) {
    return res.status(404).json({ message: 'Parking spot not found' });
  }
  
  if (spot.availableSpots <= 0) {
    return res.status(400).json({ message: 'No available spots' });
  }
  
  // Mock booking logic
  spot.availableSpots -= 1;
  
  const booking = {
    id: Date.now(),
    spotId: spot.id,
    spotName: spot.name,
    duration: duration,
    startTime: startTime,
    totalCost: spot.hourlyRate * duration,
    status: 'confirmed'
  };
  
  res.json({
    message: 'Booking successful',
    booking: booking
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
  console.log(`Loaded ${parkingSpots.length} parking spots and ${parkingInsights.length} insights`);
}); 