"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  CreditCard,
  Settings,
} from "lucide-react"

export default function DashboardPage() {
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  // Sample data for dashboard
  const stats = [
    { title: "Total Sales", value: "SAR 125,430", change: "+12.5%", icon: TrendingUp },
    { title: "Orders Today", value: "47", change: "+8.2%", icon: ShoppingCart },
    { title: "Active Customers", value: "1,234", change: "+15.3%", icon: Users },
    { title: "Low Stock Items", value: "12", change: "-5.1%", icon: Package },
  ]

  const recentOrders = [
    { id: "ORD-001", customer: "Ahmed Al-Rashid", amount: "SAR 245.00", status: "Completed", time: "2 min ago" },
    { id: "ORD-002", customer: "Fatima Al-Zahra", amount: "SAR 89.50", status: "Processing", time: "15 min ago" },
    { id: "ORD-003", customer: "Mohammed Al-Saud", amount: "SAR 567.80", status: "Completed", time: "1 hour ago" },
    { id: "ORD-004", customer: "Sara Al-Mansouri", amount: "SAR 134.25", status: "Completed", time: "2 hours ago" },
    { id: "ORD-005", customer: "Omar Al-Khalifa", amount: "SAR 78.90", status: "Pending", time: "3 hours ago" },
  ]

  const topProducts = [
    { name: "Wireless Mouse", sales: 45, revenue: "SAR 6,750" },
    { name: "HDMI Cable", sales: 38, revenue: "SAR 3,800" },
    { name: "Phone Charger", sales: 52, revenue: "SAR 5,200" },
    { name: "Laptop Sleeve", sales: 29, revenue: "SAR 8,700" },
    { name: "USB Drive", sales: 41, revenue: "SAR 4,100" },
  ]

  const salesData = [
    { month: "Jan", sales: 45000 },
    { month: "Feb", sales: 52000 },
    { month: "Mar", sales: 48000 },
    { month: "Apr", sales: 61000 },
    { month: "May", sales: 55000 },
    { month: "Jun", sales: 67000 },
  ]

  const inventoryAlerts = [
    { product: "Wireless Mouse", stock: 5, threshold: 10, status: "Low Stock" },
    { product: "HDMI Cable", stock: 2, threshold: 15, status: "Critical" },
    { product: "Phone Charger", stock: 8, threshold: 20, status: "Low Stock" },
    { product: "Laptop Sleeve", stock: 0, threshold: 25, status: "Out of Stock" },
  ]

  return (
    <main className="relative min-h-screen w-full bg-background">
      {/* Shader Background */}
      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" } as React.CSSProperties}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1275d8"
            colorB="#e19136"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#0066ff"
            upColor="#0066ff"
            downColor="#d1d1d1"
            leftColor="#e19136"
            rightColor="#e19136"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Grain Overlay */}
      <GrainOverlay />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Main Layout */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Sidebar Navigation */}
        <aside className={`fixed left-0 top-0 z-40 h-full w-64 bg-background/95 backdrop-blur-md border-r border-foreground/10 transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex flex-col h-full pt-20 pb-4">
            {/* Navigation Items */}
            <nav className="flex-1 px-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <BarChart3 className="h-5 w-5" />
                  <span className="font-sans text-sm font-medium">Dashboard</span>
                </div>

                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group">
                  <ShoppingCart className="h-5 w-5 text-foreground/60 group-hover:text-foreground" />
                  <span className="font-sans text-sm text-foreground/60 group-hover:text-foreground">Sales</span>
                </div>

                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group">
                  <Package className="h-5 w-5 text-foreground/60 group-hover:text-foreground" />
                  <span className="font-sans text-sm text-foreground/60 group-hover:text-foreground">Inventory</span>
                </div>

                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group">
                  <Users className="h-5 w-5 text-foreground/60 group-hover:text-foreground" />
                  <span className="font-sans text-sm text-foreground/60 group-hover:text-foreground">Customers</span>
                </div>

                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group">
                  <TrendingUp className="h-5 w-5 text-foreground/60 group-hover:text-foreground" />
                  <span className="font-sans text-sm text-foreground/60 group-hover:text-foreground">Analytics</span>
                </div>

                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group">
                  <CreditCard className="h-5 w-5 text-foreground/60 group-hover:text-foreground" />
                  <span className="font-sans text-sm text-foreground/60 group-hover:text-foreground">Reports</span>
                </div>

                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group">
                  <Settings className="h-5 w-5 text-foreground/60 group-hover:text-foreground" />
                  <span className="font-sans text-sm text-foreground/60 group-hover:text-foreground">Settings</span>
                </div>
              </div>
            </nav>

            {/* Bottom Section */}
            <div className="px-4">
              <div className="rounded-lg border border-foreground/10 bg-background/50 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="font-mono text-xs text-foreground/60">System Online</span>
                </div>
                <p className="font-mono text-xs text-foreground/40">Last sync: 2 min ago</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 ml-64 flex flex-col">
          {/* Navigation */}
          <nav className={`fixed left-64 right-0 top-0 z-50 flex items-center justify-between border-b border-foreground/10 bg-background/80 backdrop-blur-md px-6 py-4 md:px-12 transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}>
            <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/favicon.svg"
                  alt="CloudPOS Logo"
                  className="h-6 w-6 drop-shadow-sm"
                />
              </div>
              <span className="font-sans text-xl font-semibold tracking-tight text-foreground">CloudPOS</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-foreground/60">Welcome back, Admin</span>
              <MagneticButton variant="secondary">
                <Link href="/">Sign Out</Link>
              </MagneticButton>
            </div>
          </nav>

          {/* Dashboard Content */}
          <div className="flex-1 overflow-y-auto pt-20">
            {/* Overview Section */}
            <section className="px-6 py-8 md:px-12">
              <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                  <h1 className="mb-2 font-sans text-3xl font-light tracking-tight text-foreground">
                    Dashboard Overview
                  </h1>
                  <p className="font-mono text-sm text-foreground/60">
                    Monitor your business performance and manage operations
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <div
                        key={index}
                        className="rounded-lg border border-foreground/10 bg-background/50 backdrop-blur-sm p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-mono text-sm text-foreground/60 mb-2">{stat.title}</p>
                            <p className="font-sans text-2xl font-semibold text-foreground">{stat.value}</p>
                            <p className={`font-mono text-sm mt-2 ${
                              stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stat.change}
                            </p>
                          </div>
                          <Icon className="h-8 w-8 text-foreground/40" />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-8 lg:grid-cols-3">
                  {/* Recent Orders */}
                  <div className="lg:col-span-2">
                    <div className="rounded-lg border border-foreground/10 bg-background/50 backdrop-blur-sm p-6">
                      <div className="mb-6 flex items-center justify-between">
                        <h2 className="font-sans text-xl font-semibold text-foreground">Recent Orders</h2>
                        <MagneticButton variant="secondary" className="h-9 px-4">
                          View All
                        </MagneticButton>
                      </div>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {recentOrders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between border-b border-foreground/5 pb-4 last:border-0">
                            <div>
                              <p className="font-mono text-sm font-medium text-foreground">{order.id}</p>
                              <p className="font-mono text-xs text-foreground/60">{order.customer}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-sans text-base font-semibold text-foreground">{order.amount}</p>
                              <p className={`font-mono text-xs ${
                                order.status === 'Completed' ? 'text-green-600' : order.status === 'Processing' ? 'text-orange-600' : 'text-yellow-600'
                              }`}>
                                {order.status}
                              </p>
                            </div>
                            <p className="font-mono text-xs text-foreground/40">{order.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top Products */}
                  <div>
                    <div className="rounded-lg border border-foreground/10 bg-background/50 backdrop-blur-sm p-6">
                      <h2 className="mb-6 font-sans text-xl font-semibold text-foreground">Top Products</h2>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {topProducts.map((product, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <p className="font-sans text-sm font-medium text-foreground">{product.name}</p>
                              <p className="font-mono text-xs text-foreground/60">{product.sales} sales</p>
                            </div>
                            <p className="font-sans text-sm font-semibold text-foreground">{product.revenue}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                  <h2 className="mb-6 font-sans text-xl font-semibold text-foreground">Quick Actions</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <MagneticButton variant="secondary" className="h-20 flex-col gap-2">
                      <ShoppingCart className="h-6 w-6" />
                      <span className="font-mono text-sm">New Sale</span>
                    </MagneticButton>
                    <MagneticButton variant="secondary" className="h-20 flex-col gap-2">
                      <Package className="h-6 w-6" />
                      <span className="font-mono text-sm">Manage Inventory</span>
                    </MagneticButton>
                    <MagneticButton variant="secondary" className="h-20 flex-col gap-2">
                      <Users className="h-6 w-6" />
                      <span className="font-mono text-sm">Customer List</span>
                    </MagneticButton>
                    <MagneticButton variant="secondary" className="h-20 flex-col gap-2">
                      <BarChart3 className="h-6 w-6" />
                      <span className="font-mono text-sm">Reports</span>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </section>

            {/* Analytics Section */}
            <section className="px-6 py-8 md:px-12 border-t border-foreground/10">
              <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                  <h1 className="mb-2 font-sans text-3xl font-light tracking-tight text-foreground">
                    Analytics & Insights
                  </h1>
                  <p className="font-mono text-sm text-foreground/60">
                    Detailed performance metrics and business intelligence
                  </p>
                </div>

                {/* Sales Chart */}
                <div className="mb-8 rounded-lg border border-foreground/10 bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-6 font-sans text-xl font-semibold text-foreground">Sales Overview</h2>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {salesData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="w-full bg-primary rounded-t transition-all duration-300 hover:bg-primary/80"
                          style={{ height: `${(data.sales / 70000) * 100}%` } as React.CSSProperties}
                        ></div>
                        <p className="text-sm text-foreground/60 mt-2 font-mono">{data.month}</p>
                        <p className="text-sm text-foreground font-sans">SAR {(data.sales / 1000).toFixed(0)}k</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inventory Alerts */}
                <div className="rounded-lg border border-foreground/10 bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-6 font-sans text-xl font-semibold text-foreground">Inventory Alerts</h2>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {inventoryAlerts.map((alert, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                        <div>
                          <p className="font-sans text-sm font-medium text-foreground">{alert.product}</p>
                          <p className="font-mono text-xs text-foreground/60">Stock: {alert.stock} / Threshold: {alert.threshold}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-mono ${
                          alert.status === 'Critical' ? 'bg-red-500/20 text-red-600' :
                          alert.status === 'Out of Stock' ? 'bg-orange-500/20 text-orange-600' :
                          'bg-yellow-500/20 text-yellow-600'
                        }`}>
                          {alert.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Reports Section */}
            <section className="px-6 py-8 md:px-12 border-t border-foreground/10">
              <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                  <h1 className="mb-2 font-sans text-3xl font-light tracking-tight text-foreground">
                    Reports & Exports
                  </h1>
                  <p className="font-mono text-sm text-foreground/60">
                    Generate comprehensive business reports and analytics
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border border-foreground/10 bg-background/50 backdrop-blur-sm p-6 hover:bg-accent/50 transition-colors cursor-pointer group">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <BarChart3 className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-sans text-lg font-semibold text-foreground mb-2">Sales Report</h3>
                      <p className="font-mono text-sm text-foreground/60">Generate detailed sales analytics and trends</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-foreground/10 bg-background/50 backdrop-blur-sm p-6 hover:bg-accent/50 transition-colors cursor-pointer group">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-sans text-lg font-semibold text-foreground mb-2">Performance Report</h3>
                      <p className="font-mono text-sm text-foreground/60">Track business performance and KPIs</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-foreground/10 bg-background/50 backdrop-blur-sm p-6 hover:bg-accent/50 transition-colors cursor-pointer group">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-sans text-lg font-semibold text-foreground mb-2">Inventory Report</h3>
                      <p className="font-mono text-sm text-foreground/60">Monitor stock levels and inventory status</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-foreground/10 bg-background/50 backdrop-blur-sm p-6 hover:bg-accent/50 transition-colors cursor-pointer group">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-sans text-lg font-semibold text-foreground mb-2">Customer Report</h3>
                      <p className="font-mono text-sm text-foreground/60">Analyze customer behavior and demographics</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-foreground/10 bg-background/50 backdrop-blur-sm p-6 hover:bg-accent/50 transition-colors cursor-pointer group">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-sans text-lg font-semibold text-foreground mb-2">Financial Report</h3>
                      <p className="font-mono text-sm text-foreground/60">Review revenue, expenses, and profitability</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-foreground/10 bg-background/50 backdrop-blur-sm p-6 hover:bg-accent/50 transition-colors cursor-pointer group">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <ShoppingCart className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-sans text-lg font-semibold text-foreground mb-2">Order Report</h3>
                      <p className="font-mono text-sm text-foreground/60">Track order fulfillment and processing</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
