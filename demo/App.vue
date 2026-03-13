<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import Tag from "primevue/tag";
import Badge from "primevue/badge";
import Avatar from "primevue/avatar";
import Chip from "primevue/chip";
import ProgressBar from "primevue/progressbar";
import { ThemeChooser } from "../src/index";

const activeSection = ref("dashboard");
const sidebarCollapsed = ref(false);

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "pi pi-home" },
  { id: "analytics", label: "Analytics", icon: "pi pi-chart-line" },
  { id: "users", label: "Users", icon: "pi pi-users" },
  { id: "products", label: "Products", icon: "pi pi-box" },
  { id: "orders", label: "Orders", icon: "pi pi-shopping-cart" },
  { id: "settings", label: "Settings", icon: "pi pi-cog" },
];

const stats = [
  { label: "Total Revenue", value: "€124,563", change: "+12.5%", trend: "up", icon: "pi pi-dollar" },
  { label: "Active Users", value: "8,429", change: "+5.2%", trend: "up", icon: "pi pi-users" },
  { label: "Orders Today", value: "156", change: "-2.1%", trend: "down", icon: "pi pi-shopping-cart" },
  { label: "Conversion Rate", value: "3.24%", change: "+0.8%", trend: "up", icon: "pi pi-percentage" },
];

const recentOrders = [
  { id: "ORD-001", customer: "Emma Johnson", product: "Premium Plan", amount: 299, status: "completed", date: "2026-03-13" },
  { id: "ORD-002", customer: "Liam Chen", product: "Basic Plan", amount: 99, status: "pending", date: "2026-03-13" },
  { id: "ORD-003", customer: "Sofia Rodriguez", product: "Enterprise", amount: 999, status: "processing", date: "2026-03-12" },
  { id: "ORD-004", customer: "Noah Kim", product: "Premium Plan", amount: 299, status: "completed", date: "2026-03-12" },
  { id: "ORD-005", customer: "Ava Thompson", product: "Basic Plan", amount: 99, status: "cancelled", date: "2026-03-11" },
];

const statusSeverity = {
  completed: "success",
  pending: "warn",
  processing: "info",
  cancelled: "danger",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(amount);
}
</script>

<template>
  <div class="min-h-screen bg-surface-0 text-surface-900 flex">
    <!-- Sidebar -->
    <aside 
      class="bg-surface-50 border-r border-surface-200 transition-all duration-300"
      :class="sidebarCollapsed ? 'w-16' : 'w-64'"
    >
      <div class="p-4 border-b border-surface-200">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">TB</span>
          </div>
          <span v-if="!sidebarCollapsed" class="font-semibold text-lg">Theme Builder</span>
        </div>
      </div>
      
      <nav class="p-2">
        <button
          v-for="item in menuItems"
          :key="item.id"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors mb-1"
          :class="activeSection === item.id 
            ? 'bg-primary-100 text-primary-800 font-medium' 
            : 'text-surface-600 hover:bg-surface-100 hover:text-surface-800'"
          @click="activeSection = item.id"
        >
          <span :class="item.icon" class="text-sm" />
          <span v-if="!sidebarCollapsed" class="text-sm">{{ item.label }}</span>
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-surface-0 border-b border-surface-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button 
              @click="sidebarCollapsed = !sidebarCollapsed"
              class="p-2 rounded-lg hover:bg-surface-100 transition-colors"
            >
              <span class="pi pi-bars text-surface-600" />
            </button>
            <h1 class="text-xl font-semibold capitalize">{{ activeSection }}</h1>
          </div>
          <div class="flex items-center gap-3">
            <ThemeChooser />
            <button class="p-2 rounded-lg hover:bg-surface-100 transition-colors">
              <span class="pi pi-bell text-surface-600" />
            </button>
            <Avatar label="JD" size="normal" style="background-color: var(--p-primary-600); color: white" />
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <main class="flex-1 p-6 overflow-auto bg-surface-50">
        <div v-if="activeSection === 'dashboard'" class="space-y-6">
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card
              v-for="stat in stats"
              :key="stat.label"
            >
              <template #content>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span :class="stat.icon" class="text-primary-600" />
                  </div>
                  <Badge 
                    :value="stat.change" 
                    :severity="stat.trend === 'up' ? 'success' : 'danger'"
                    size="small"
                  />
                </div>
                <div class="space-y-1">
                  <p class="text-2xl font-bold">{{ stat.value }}</p>
                  <p class="text-sm text-surface-500">{{ stat.label }}</p>
                </div>
              </template>
            </Card>
          </div>

          <!-- Recent Orders Table -->
          <Card>
            <template #content>
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold">Recent Orders</h2>
                <div class="flex gap-2">
                  <button class="px-3 py-1.5 text-sm bg-surface-100 hover:bg-surface-200 rounded-lg transition-colors">
                    Export
                  </button>
                  <button class="px-3 py-1.5 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                    New Order
                  </button>
                </div>
              </div>

              <div class="overflow-x-auto -mx-6 -mb-6">
                <table class="w-full">
                  <thead class="bg-surface-50">
                    <tr>
                      <th class="text-left px-6 py-3 text-xs font-semibold text-surface-600 uppercase tracking-wide">Order ID</th>
                      <th class="text-left px-6 py-3 text-xs font-semibold text-surface-600 uppercase tracking-wide">Customer</th>
                      <th class="text-left px-6 py-3 text-xs font-semibold text-surface-600 uppercase tracking-wide">Product</th>
                      <th class="text-left px-6 py-3 text-xs font-semibold text-surface-600 uppercase tracking-wide">Amount</th>
                      <th class="text-left px-6 py-3 text-xs font-semibold text-surface-600 uppercase tracking-wide">Status</th>
                      <th class="text-left px-6 py-3 text-xs font-semibold text-surface-600 uppercase tracking-wide">Date</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-surface-200">
                    <tr 
                      v-for="order in recentOrders" 
                      :key="order.id"
                      class="hover:bg-surface-50 transition-colors"
                    >
                      <td class="px-6 py-4 text-sm font-medium text-surface-900">{{ order.id }}</td>
                      <td class="px-6 py-4 text-sm text-surface-700">{{ order.customer }}</td>
                      <td class="px-6 py-4 text-sm text-surface-700">{{ order.product }}</td>
                      <td class="px-6 py-4 text-sm font-medium text-surface-900">{{ formatCurrency(order.amount) }}</td>
                      <td class="px-6 py-4">
                        <Tag 
                          :value="order.status"
                          :severity="{
                            'completed': 'success',
                            'pending': 'warn',
                            'processing': 'info',
                            'cancelled': 'danger'
                          }[order.status]"
                        />
                      </td>
                      <td class="px-6 py-4 text-sm text-surface-500">{{ order.date }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </Card>

          <!-- Action Cards -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <template #title>Quick Actions</template>
              <template #content>
                <div class="space-y-3">
                  <button class="w-full flex items-center gap-3 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                    <span class="pi pi-plus" />
                    Create New Product
                  </button>
                  <button class="w-full flex items-center gap-3 p-3 border border-surface-300 hover:bg-surface-50 rounded-lg transition-colors">
                    <span class="pi pi-upload" />
                    Import Data
                  </button>
                  <button class="w-full flex items-center gap-3 p-3 border border-surface-300 hover:bg-surface-50 rounded-lg transition-colors">
                    <span class="pi pi-download" />
                    Export Report
                  </button>
                </div>
              </template>
            </Card>

            <Card>
              <template #title>Theme Preview</template>
              <template #content>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-surface-700 mb-2">Sample Input</label>
                    <input 
                      type="text" 
                      placeholder="Type something..."
                      class="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    />
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <Tag value="Primary" severity="primary" />
                    <Tag value="Success" severity="success" />
                    <Tag value="Warning" severity="warn" />
                    <Tag value="Error" severity="danger" />
                  </div>
                  <div class="flex gap-2">
                    <button class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-lg transition-colors">
                      Primary
                    </button>
                    <button class="px-4 py-2 border border-surface-300 hover:bg-surface-50 text-sm rounded-lg transition-colors">
                      Secondary
                    </button>
                  </div>
                </div>
              </template>
            </Card>

            <Card>
              <template #title>Color Palettes</template>
              <template #content>
                <div class="space-y-4">
                  <div>
                    <p class="text-sm font-medium text-surface-700 mb-2">Primary</p>
                    <div class="flex gap-1">
                      <span
                        v-for="shade in [100, 300, 500, 700, 900]"
                        :key="shade"
                        class="w-6 h-6 rounded"
                        :class="`bg-primary-${shade}`"
                        :title="`primary-${shade}`"
                      />
                    </div>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-surface-700 mb-2">Surface</p>
                    <div class="flex gap-1">
                      <span
                        v-for="shade in [100, 300, 500, 700, 900]"
                        :key="shade"
                        class="w-6 h-6 rounded"
                        :class="`bg-surface-${shade}`"
                        :title="`surface-${shade}`"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>

        <!-- Analytics Section -->
        <div v-else-if="activeSection === 'analytics'" class="space-y-6">
          <Card>
            <template #title>Analytics Overview</template>
            <template #content>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <h3 class="text-lg font-medium">Traffic Sources</h3>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-surface-600">Direct</span>
                      <div class="flex items-center gap-2">
                        <ProgressBar :value="60" class="w-20" style="height: 8px" />
                        <span class="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-surface-600">Social Media</span>
                      <div class="flex items-center gap-2">
                        <ProgressBar :value="25" class="w-20" style="height: 8px" />
                        <span class="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-surface-600">Search Engines</span>
                      <div class="flex items-center gap-2">
                        <ProgressBar :value="15" class="w-20" style="height: 8px" />
                        <span class="text-sm font-medium">15%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="space-y-4">
                  <h3 class="text-lg font-medium">Performance Metrics</h3>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="text-center p-4 bg-surface-50 rounded-lg">
                      <p class="text-2xl font-bold text-primary-600">2.4s</p>
                      <p class="text-xs text-surface-500">Avg Load Time</p>
                    </div>
                    <div class="text-center p-4 bg-surface-50 rounded-lg">
                      <p class="text-2xl font-bold text-green-600">99.9%</p>
                      <p class="text-xs text-surface-500">Uptime</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>

        <!-- Users Section -->
        <div v-else-if="activeSection === 'users'" class="space-y-6">
          <Card>
            <template #title>User Management</template>
            <template #content>
              <div class="flex flex-wrap gap-2 mb-4">
                <Chip label="All Users" icon="pi pi-users" />
                <Chip label="Active" icon="pi pi-check-circle" class="p-chip-success" />
                <Chip label="Pending" icon="pi pi-clock" class="p-chip-warning" />
                <Chip label="Blocked" icon="pi pi-ban" class="p-chip-danger" />
              </div>
              <p class="text-surface-600">User management interface would go here...</p>
            </template>
          </Card>
        </div>

        <!-- Other Sections -->
        <div v-else class="space-y-6">
          <Card>
            <template #title>{{ activeSection.charAt(0).toUpperCase() + activeSection.slice(1) }}</template>
            <template #content>
              <p class="text-surface-600">{{ activeSection }} content would go here...</p>

              <div class="mt-6 flex flex-wrap gap-3">
                <button class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                  Primary Action
                </button>
                <button class="px-4 py-2 border border-surface-300 hover:bg-surface-50 rounded-lg transition-colors">
                  Secondary Action
                </button>
                <button class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Success Action
                </button>
                <button class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                  Danger Action
                </button>
              </div>
            </template>
          </Card>
        </div>
      </main>
    </div>
  </div>
</template>
