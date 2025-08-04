# Melbourne Parking System

一个完整的墨尔本停车系统，包含前端和后端 API。

## 🚀 快速开始

### 使用启动脚本（推荐）
```bash
./start-dev.sh
```

### 手动启动

1. **启动后端 API**
```bash
cd backend
npm install
npm run dev
```

2. **启动前端应用**
```bash
cd frontend
npm install
npm run dev
```

## 📁 项目结构

```
ParkingSystem/
├── frontend/          # Next.js 前端应用
│   ├── app/          # 页面组件
│   ├── components/   # 可复用组件
│   ├── services/     # API 服务
│   └── package.json
├── backend/          # Express.js 后端 API
│   ├── data/        # Mock 数据文件
│   ├── server.js    # 主服务器文件
│   └── package.json
└── start-dev.sh     # 开发环境启动脚本
```

## 🌐 访问地址

- **前端应用**: http://localhost:3000 (或 3001)
- **后端 API**: http://localhost:5001

## 📊 API 端点

### 停车位相关
- `GET /api/parking-spots` - 获取所有停车位
- `GET /api/parking-spots/:id` - 获取特定停车位
- `GET /api/parking-spots/search` - 搜索停车位
- `POST /api/parking-spots/:id/book` - 预订停车位

### 数据分析相关
- `GET /api/insights` - 获取所有数据分析
- `GET /api/insights/:id` - 获取特定数据分析

## 🎯 功能特性

### 前端功能
- ✅ 实时停车位查找
- ✅ 交互式地图显示
- ✅ 停车位列表和筛选
- ✅ 数据分析图表
- ✅ 响应式设计

### 后端功能
- ✅ RESTful API
- ✅ CORS 支持
- ✅ Mock 数据管理
- ✅ 错误处理
- ✅ 搜索和预订功能

## 📈 数据统计

- **7 个停车场** - 包含详细信息
- **6 个数据分析图表** - 多种图表类型
- **实时数据更新** - 模拟真实场景

## 🛠️ 技术栈

### 前端
- Next.js 15.4.5
- React 18
- TypeScript
- Tailwind CSS
- Recharts (图表库)

### 后端
- Express.js
- Node.js
- CORS
- JSON 数据存储

## 📝 开发说明

1. **数据管理**: Mock 数据存储在 `backend/data/` 目录
2. **API 服务**: 前端通过 `frontend/services/api.ts` 连接后端
3. **端口配置**: 前端 3000/3001，后端 5001
4. **热重载**: 开发模式下支持代码热重载

## 🚀 部署

### 生产环境
```bash
# 后端
cd backend
npm start

# 前端
cd frontend
npm run build
npm start
```

---

© 2024 Melbourne Parking System. 为墨尔本通勤者提供智能停车解决方案。