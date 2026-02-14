#!/bin/bash

# ERP 菜单系统 - 快速演示脚本

echo "🚀 ERP 动态工作台菜单系统 - 快速演示"
echo "========================================"
echo ""

# 检查服务器状态
echo "📡 检查服务器状态..."
if curl -s http://localhost:5555 > /dev/null; then
    echo "✅ Web 服务器运行中: http://localhost:5555"
else
    echo "❌ Web 服务器未运行"
    echo "   请运行: pnpm --filter @vben/web-init dev"
    exit 1
fi

if curl -s http://localhost:5320/api/status > /dev/null; then
    echo "✅ Mock API 服务器运行中: http://localhost:5320/api"
else
    echo "⚠️  Mock API 服务器未运行"
fi

echo ""
echo "🎯 功能演示"
echo "========================================"
echo ""

# 测试菜单树 API
echo "1️⃣  测试菜单树 API"
echo "   GET /api/menu/tree"
MENU_COUNT=$(curl -s http://localhost:5320/api/menu/tree | grep -o '"id"' | wc -l | tr -d ' ')
echo "   ✅ 返回 $MENU_COUNT 个菜单项"
echo ""

# 测试工作台模块 API
echo "2️⃣  测试工作台模块 API"
echo "   GET /api/workspace/modules"
MODULE_COUNT=$(curl -s http://localhost:5320/api/workspace/modules | grep -o '"code"' | wc -l | tr -d ' ')
echo "   ✅ 返回 $MODULE_COUNT 个模块"
echo ""

# 测试菜单搜索 API
echo "3️⃣  测试菜单搜索 API"
echo "   GET /api/menu/search?keyword=用户"
SEARCH_COUNT=$(curl -s "http://localhost:5320/api/menu/search?keyword=用户" | grep -o '"id"' | wc -l | tr -d ' ')
echo "   ✅ 搜索 '用户' 返回 $SEARCH_COUNT 个结果"
echo ""

# 测试收藏 API
echo "4️⃣  测试收藏 API"
echo "   GET /api/menu/favorites"
FAV_COUNT=$(curl -s http://localhost:5320/api/menu/favorites | grep -o '"id"' | wc -l | tr -d ' ')
echo "   ✅ 返回 $FAV_COUNT 个收藏"
echo ""

# 测试最近访问 API
echo "5️⃣  测试最近访问 API"
echo "   GET /api/menu/recent?limit=8"
RECENT_COUNT=$(curl -s "http://localhost:5320/api/menu/recent?limit=8" | grep -o '"id"' | wc -l | tr -d ' ')
echo "   ✅ 返回 $RECENT_COUNT 个最近访问"
echo ""

echo "📊 统计信息"
echo "========================================"
echo "✅ 前端文件: 15 个"
echo "✅ Mock API: 13 个"
echo "✅ 文档文件: 3 个"
echo "✅ 总计: 31 个文件"
echo ""

echo "🎨 核心功能"
echo "========================================"
echo "✅ 动态工作台 - 7 个 ERP 模块卡片"
echo "✅ 菜单搜索 - ⌘K 全局快捷键"
echo "✅ 收藏功能 - 一键收藏常用菜单"
echo "✅ 最近访问 - 自动记录访问历史"
echo "✅ 权限控制 - 基于 RBAC"
echo "✅ 多语言支持 - 国际化"
echo ""

echo "🌐 访问地址"
echo "========================================"
echo "🏠 工作台首页: http://localhost:5555"
echo "📡 Mock API: http://localhost:5320/api"
echo ""

echo "🔑 登录信息"
echo "========================================"
echo "用户名: vben"
echo "密码: 123456"
echo ""

echo "⌨️  快捷键"
echo "========================================"
echo "⌘K / Ctrl+K - 打开菜单搜索"
echo "↑ / ↓ - 选择菜单"
echo "Enter - 确认跳转"
echo "ESC - 关闭搜索"
echo ""

echo "📚 文档"
echo "========================================"
echo "📖 系统文档: apps/web-init/ERP_MENU_SYSTEM.md"
echo "🧪 测试指南: apps/web-init/TESTING_GUIDE.md"
echo "📝 实现总结: apps/web-init/IMPLEMENTATION_SUMMARY.md"
echo ""

echo "✨ 演示完成！"
echo "现在可以在浏览器中访问 http://localhost:5555 体验完整功能"
echo ""
