# Melbourne Parking System - Backend API

这是一个使用 Express.js 构建的墨尔本停车系统后端 API。

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 启动生产服务器：
```bash
npm start
```

服务器将在 `http://localhost:5001` 运行。

## 项目结构

```
backend/
├── server.js              # 主服务器文件
├── package.json           # 项目配置
├── data/                  # Mock 数据文件夹
│   ├── parking-spots.json # 停车位数据
│   └── insights.json      # 数据分析
└── README.md              # 项目文档
```

## API 端点

### 停车位相关

- `GET /api/parking-spots` - 获取所有停车位
- `GET /api/parking-spots/:id` - 根据 ID 获取特定停车位
- `GET /api/parking-spots/search?query=...&maxPrice=...&availableOnly=...` - 搜索停车位
- `POST /api/parking-spots/:id/book` - 预订停车位

### 数据分析相关

- `GET /api/insights` - 获取所有数据分析
- `GET /api/insights/:id` - 根据 ID 获取特定数据分析

## Mock 数据

### 停车位数据 (`data/parking-spots.json`)
包含 7 个墨尔本停车场的详细信息：
- Melbourne Central Car Park
- Wilson Parking - Collins Street
- Crown Casino Car Park
- Federation Square Car Park
- QV Melbourne Car Park
- Emporium Melbourne Car Park
- South Wharf Car Park

每个停车位包含：
- 基本信息（名称、地址、坐标）
- 容量信息（总车位、可用车位）
- 价格信息（小时费率）
- 状态信息（是否开放、评分）
- 详细信息（描述、特色功能、营业时间）

### 数据分析 (`data/insights.json`)
包含 6 个数据分析图表：
- 高峰时段分析（折线图）
- 停车位可用性（饼图）
- 平均小时费率（柱状图）
- 周使用趋势（折线图）
- 停车功能分布（环形图）
- 月度收入分析（面积图）

## 示例请求

```bash
# 获取所有停车位
curl http://localhost:5001/api/parking-spots

# 搜索停车位
curl "http://localhost:5001/api/parking-spots/search?query=central&maxPrice=10"

# 预订停车位
curl -X POST http://localhost:5001/api/parking-spots/1/book \
  -H "Content-Type: application/json" \
  -d '{"duration": 2, "startTime": "2024-01-15T10:00:00Z"}'

# 获取数据分析
curl http://localhost:5001/api/insights
```

## 数据管理

Mock 数据存储在 `data/` 文件夹中的 JSON 文件里，便于：
- 独立维护和更新数据
- 版本控制
- 团队协作
- 数据迁移 