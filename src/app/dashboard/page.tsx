"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Cloud,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Eye
} from "lucide-react";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dummy data
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "gradient-success"
    },
    {
      title: "Orders Today",
      value: "1,429",
      change: "+15.3%",
      trend: "up",
      icon: ShoppingCart,
      color: "gradient-primary"
    },
    {
      title: "Active Products",
      value: "2,847",
      change: "+7.2%",
      trend: "up",
      icon: Package,
      color: "gradient-accent"
    },
    {
      title: "Total Customers",
      value: "12,234",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "gradient-info"
    }
  ];

  const recentOrders = [
    {
      id: "#3210",
      customer: "John Smith",
      email: "john@example.com",
      amount: "$299.00",
      status: "completed",
      date: "2024-01-15"
    },
    {
      id: "#3209",
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      amount: "$149.50",
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: "#3208",
      customer: "Mike Davis",
      email: "mike@example.com",
      amount: "$89.99",
      status: "completed",
      date: "2024-01-14"
    },
    {
      id: "#3207",
      customer: "Emma Wilson",
      email: "emma@example.com",
      amount: "$199.00",
      status: "processing",
      date: "2024-01-14"
    }
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: 1247, revenue: "$24,940", growth: "+12%" },
    { name: "Smart Watch", sales: 892, revenue: "$35,680", growth: "+8%" },
    { name: "Laptop Stand", sales: 654, revenue: "$9,810", growth: "+15%" },
    { name: "USB Cable", sales: 432, revenue: "$2,592", growth: "+5%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "processing": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 glass border-r border-white/20 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-white/20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cloud POS
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link href="/dashboard" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg gradient-primary text-white">
              <BarChart3 className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link href="/products" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg glass border-white/20 hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300">
              <Package className="w-5 h-5 mr-3" />
              Products
            </Link>
            <Link href="/orders" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg glass border-white/20 hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300">
              <ShoppingCart className="w-5 h-5 mr-3" />
              Orders
            </Link>
            <Link href="/customers" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg glass border-white/20 hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300">
              <Users className="w-5 h-5 mr-3" />
              Customers
            </Link>
            <Link href="/analytics" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg glass border-white/20 hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300">
              <TrendingUp className="w-5 h-5 mr-3" />
              Analytics
            </Link>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-white/20">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  john@company.com
                </p>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Header */}
        <header className="glass border-b border-white/20 px-4 py-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <BarChart3 className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Welcome back! Here&apos;s what&apos;s happening with your business.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="glass border-white/20">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="glass border-white/20">
                <Settings className="w-4 h-4" />
              </Button>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                New Order
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="glass border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-500 mr-1" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                      {stat.change}
                    </span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Sales Overview
                </CardTitle>
                <CardDescription>Monthly sales performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
                      <TrendingUp className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sales chart visualization would go here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Recent Orders
                  </span>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg glass border-white/20">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>
                            {order.customer.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {order.customer}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {order.id}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {order.amount}
                        </p>
                        <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Products */}
            <Card className="lg:col-span-2 glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Top Products
                </CardTitle>
                <CardDescription>Best performing products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg glass border-white/20">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {product.sales} sales
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {product.revenue}
                        </p>
                        <p className="text-sm text-green-500">
                          {product.growth}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full gradient-primary justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Product
                </Button>
                <Button variant="outline" className="w-full glass border-white/20 justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Customers
                </Button>
                <Button variant="outline" className="w-full glass border-white/20 justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
                <Button variant="outline" className="w-full glass border-white/20 justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}