<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Tag from "primevue/tag";
import Message from "primevue/message";
import { shallowRef, computed } from "vue";

type Swatch = { shade: number; hex: string };

const props = defineProps<{
    primarySwatches: Swatch[];
    surfaceSwatches: Swatch[];
    bodyFont?: string;
    titleFont?: string;
}>();

const containerStyle = computed(() => ({
    fontFamily: props.bodyFont ? `'${props.bodyFont}', sans-serif` : undefined,
}));

const titleStyle = computed(() => ({
    fontFamily: props.titleFont ? `'${props.titleFont}', serif` : undefined,
}));

const sampleInput = shallowRef("Sample text");

type Invoice = {
    id: string;
    customer: string;
    amount: number;
    status: string;
    date: string;
};

const tableRows: Invoice[] = [
    { id: "INV-001", customer: "Lena Bergström",  amount: 1240.00, status: "Paid",    date: "2026-01-14" },
    { id: "INV-002", customer: "Marco Ricci",      amount:  580.50, status: "Pending", date: "2026-01-18" },
    { id: "INV-003", customer: "Aisha Mensah",     amount: 3100.00, status: "Paid",    date: "2026-01-21" },
    { id: "INV-004", customer: "Tom Brandt",       amount:  245.00, status: "Overdue", date: "2026-01-05" },
    { id: "INV-005", customer: "Sara Lindqvist",   amount:  890.75, status: "Pending", date: "2026-01-25" },
    { id: "INV-006", customer: "Yuki Tanaka",      amount: 2350.00, status: "Paid",    date: "2026-01-28" },
];

const statusSeverity: Record<string, "success" | "warn" | "danger" | "secondary"> = {
    Paid: "success",
    Pending: "warn",
    Overdue: "danger",
};

function formatAmount(value: number): string {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
}
</script>

<template>
  <div class="flex flex-col gap-6" :style="containerStyle">
    <Card>
      <template #title>Surface palette</template>
      <template #content>
        <div class="flex gap-px rounded overflow-hidden">
          <div
            v-for="swatch in surfaceSwatches"
            :key="swatch.shade"
            class="flex-1 h-12 flex flex-col items-center justify-end pb-1 gap-0.5"
            :style="{ background: swatch.hex }"
          >
            <span
              class="text-[8px] font-mono leading-none"
              :style="{ color: swatch.shade >= 500 ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.45)' }"
            >{{ swatch.shade }}</span>
          </div>
        </div>
      </template>
    </Card>

    <Card>
      <template #title>Primary palette</template>
      <template #content>
        <div class="flex gap-px rounded overflow-hidden">
          <div
            v-for="swatch in primarySwatches"
            :key="swatch.shade"
            class="flex-1 h-12 flex flex-col items-center justify-end pb-1 gap-0.5"
            :style="{ background: swatch.hex }"
          >
            <span
              class="text-[8px] font-mono leading-none"
              :style="{ color: swatch.shade >= 500 ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.45)' }"
            >{{ swatch.shade }}</span>
          </div>
        </div>
      </template>
    </Card>
    
    <Card>
      <template #title><span :style="titleStyle">Card preview</span></template>
      <template #subtitle>Subtitle with secondary text styling</template>
      <template #content>
        <p class="text-sm text-surface-600 leading-relaxed">
          This card shows how your theme tokens affect border radius, padding, shadow depth,
          and title weight. Adjust the controls to see changes instantly.
        </p>
        <div class="flex flex-wrap gap-2 mt-4">
          <Tag value="Custom" />
          <Tag severity="success" value="Active" />
          <Tag severity="warn" value="Pending" />
          <Tag severity="danger" value="Expired" />
        </div>
      </template>
    </Card>

    <Card>
      <template #title>Buttons</template>
      <template #content>
        <div class="flex flex-wrap gap-3">
          <Button label="Primary" />
          <Button label="Secondary" severity="secondary" />
          <Button label="Outlined" outlined />
          <Button label="Text" text />
          <Button icon="pi pi-check" label="With icon" />
          <Button disabled label="Disabled" />
        </div>
        <div class="flex flex-wrap items-end gap-3 mt-4">
          <Button label="Small" size="small" />
          <Button label="Normal" />
          <Button label="Large" size="large" />
          <Button icon="pi pi-bell" rounded severity="secondary" text />
        </div>
      </template>
    </Card>

    <Card>
      <template #title>Form inputs</template>
      <template #content>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-surface-600">Text input</label>
            <InputText v-model="sampleInput" placeholder="Type something…" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-surface-600">Disabled input</label>
            <InputText disabled placeholder="Disabled" />
          </div>
        </div>
      </template>
    </Card>

    <Card>
      <template #title>Data table</template>
      <template #content>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead>
              <tr class="border-b border-surface-200">
                <th class="py-2 px-3 font-semibold text-surface-600">Invoice</th>
                <th class="py-2 px-3 font-semibold text-surface-600">Customer</th>
                <th class="py-2 px-3 font-semibold text-surface-600">Date</th>
                <th class="py-2 px-3 font-semibold text-surface-600 text-right">Amount</th>
                <th class="py-2 px-3 font-semibold text-surface-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in tableRows"
                :key="row.id"
                class="border-b border-surface-100 hover:bg-surface-50 transition-colors"
              >
                <td class="py-2 px-3 font-medium text-surface-800">{{ row.id }}</td>
                <td class="py-2 px-3 text-surface-700">{{ row.customer }}</td>
                <td class="py-2 px-3 text-surface-500">{{ row.date }}</td>
                <td class="py-2 px-3 text-surface-700 text-right tabular-nums">{{ formatAmount(row.amount) }}</td>
                <td class="py-2 px-3">
                  <Tag :value="row.status" :severity="statusSeverity[row.status] ?? 'secondary'" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </Card>

    <Card>
      <template #title>Alerts</template>
      <template #content>
        <div class="flex flex-col gap-3">
          <Message severity="success">
            <strong>Success</strong> — Your changes have been saved successfully.
          </Message>
          <Message severity="warn">
            <strong>Warning</strong> — This action may have unintended side effects.
          </Message>
          <Message severity="error">
            <strong>Error</strong> — Something went wrong. Please try again.
          </Message>
          <Message severity="info">
            <strong>Info</strong> — Your session will expire in 30 minutes.
          </Message>
          <Message severity="secondary">
            <strong>Secondary</strong> — A neutral informational message.
          </Message>
        </div>
      </template>
    </Card>
  </div>
</template>
