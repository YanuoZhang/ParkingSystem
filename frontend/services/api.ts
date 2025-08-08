const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
export interface ParkingSpot {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  totalSpots: number;
  availableSpots: number;
  hourlyRate: number;
  isOpen: boolean;
  rating: number;
  image: string;
  description: string;
  features: string[];
  operatingHours: string;
}

export interface Insight {
  id: number;
  title: string;
  description: string;
  data: {
    labels: string[];
    values: number[];
  };
  type: string;
  color?: string;
  colors?: string[];
}

export interface PopulationData {
  id?: number;
  year: number;
  population: number;
  created_at?: string;
  updated_at?: string;
}

export interface BookingRequest {
  duration: number;
  startTime: string;
}

export interface BookingResponse {
  message: string;
  booking: {
    id: number;
    spotId: number;
    spotName: string;
    duration: number;
    startTime: string;
    totalCost: number;
    status: string;
  };
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}/api${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Population data methods
  async getPopulationData(): Promise<PopulationData[]> {
    return this.request<PopulationData[]>('/population');
  }

  async getPopulationByYear(year: number): Promise<PopulationData> {
    return this.request<PopulationData>(`/population/${year}`);
  }

  async createPopulationData(data: Omit<PopulationData, 'id' | 'created_at' | 'updated_at'>): Promise<PopulationData> {
    return this.request<PopulationData>('/population', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePopulationData(year: number, data: Partial<PopulationData>): Promise<PopulationData> {
    return this.request<PopulationData>(`/population/${year}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePopulationData(year: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/population/${year}`, {
      method: 'DELETE',
    });
  }

  // Get all parking spots
  async getParkingSpots(): Promise<ParkingSpot[]> {
    return this.request<ParkingSpot[]>('/parking-spots');
  }

  // Get parking spot by ID
  async getParkingSpot(id: number): Promise<ParkingSpot> {
    return this.request<ParkingSpot>(`/parking-spots/${id}`);
  }

  // Search parking spots
  async searchParkingSpots(params: {
    query?: string;
    maxPrice?: number;
    availableOnly?: boolean;
  }): Promise<ParkingSpot[]> {
    const searchParams = new URLSearchParams();
    if (params.query) searchParams.append('query', params.query);
    if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());
    if (params.availableOnly) searchParams.append('availableOnly', 'true');

    const endpoint = `/parking-spots/search?${searchParams.toString()}`;
    return this.request<ParkingSpot[]>(endpoint);
  }

  // Get all insights
  async getInsights(): Promise<Insight[]> {
    return this.request<Insight[]>('/insights');
  }

  // Get insight by ID
  async getInsight(id: number): Promise<Insight> {
    return this.request<Insight>(`/insights/${id}`);
  }

  // Book a parking spot
  async bookParkingSpot(spotId: number, booking: BookingRequest): Promise<BookingResponse> {
    return this.request<BookingResponse>(`/parking-spots/${spotId}/book`, {
      method: 'POST',
      body: JSON.stringify(booking),
    });
  }
}

export const apiService = new ApiService(); 