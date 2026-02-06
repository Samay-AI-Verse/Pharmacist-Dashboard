// MOCK DATA
const ORDERS = [
    {
        id: 'ORD-7829',
        patientName: 'Sarah Jenkins',
        phone: '(555) 123-4567',
        age: 45,
        gender: 'Female',
        medicine: 'Amoxicillin 500mg',
        quantity: 30,
        type: 'Refill',
        status: 'pending',
        aiStatus: 'approved',
        aiReasoning: 'Prescription matches patient history. No interaction risks detected. Dosage within standard limits.',
        timestamp: '10:42 AM',
    },
    {
        id: 'ORD-7830',
        patientName: 'Michael Chen',
        phone: '(555) 987-6543',
        age: 62,
        gender: 'Male',
        medicine: 'Lisinopril 10mg',
        quantity: 90,
        type: 'New',
        status: 'pending',
        aiStatus: 'review',
        aiReasoning: 'Potential interaction with patient reported supplement (Potassium). Pharmacist review recommended.',
        timestamp: '11:15 AM',
    },
    {
        id: 'ORD-7831',
        patientName: 'Emily Davis',
        phone: '(555) 456-7890',
        age: 28,
        gender: 'Female',
        medicine: 'Sertraline 50mg',
        quantity: 30,
        type: 'Refill',
        status: 'completed',
        aiStatus: 'approved',
        aiReasoning: 'Routine refill. Compliance check passed.',
        timestamp: '09:20 AM',
    },
    {
        id: 'ORD-7832',
        patientName: 'Robert Wilson',
        phone: '(555) 222-3333',
        age: 75,
        gender: 'Male',
        medicine: 'Atorvastatin 40mg',
        quantity: 90,
        type: 'Refill',
        status: 'pending',
        aiStatus: 'approved',
        aiReasoning: 'Standard refill. Lipid profile due in 3 months.',
        timestamp: '11:30 AM',
    },
    {
        id: 'ORD-7833',
        patientName: 'Linda Martinez',
        phone: '(555) 777-8888',
        age: 50,
        gender: 'Female',
        medicine: 'Metformin 1000mg',
        quantity: 60,
        type: 'Refill',
        status: 'pending',
        aiStatus: 'approved',
        aiReasoning: 'Matches chronic care plan for T2D.',
        timestamp: '11:45 AM',
    }
];

const INVENTORY = [
    { id: 1, name: 'Amoxicillin 500mg', stock: 1240, status: 'ok' },
    { id: 2, name: 'Lisinopril 10mg', stock: 85, status: 'low' },
    { id: 3, name: 'Atorvastatin 40mg', stock: 500, status: 'ok' },
    { id: 4, name: 'Metformin 1000mg', stock: 320, status: 'ok' },
    { id: 5, name: 'Albuterol HFA', stock: 42, status: 'critical' },
    { id: 6, name: 'Levothyroxine 50mcg', stock: 210, status: 'ok' },
];

const REFILL_ALERTS = [
    { id: 1, patient: 'James Wilson', medicine: 'Omeprazole 20mg', date: 'Feb 10', phone: '(555) 111-2222' },
    { id: 2, patient: 'Patricia Brown', medicine: 'Amlodipine 5mg', date: 'Feb 12', phone: '(555) 333-4444' },
    { id: 3, patient: 'Robert Taylor', medicine: 'Gabapentin 300mg', date: 'Feb 12', phone: '(555) 555-6666' },
];

// MOCK API
export const api = {
    getOrders: () => Promise.resolve([...ORDERS]),
    getInventory: () => Promise.resolve([...INVENTORY]),
    getRefillAlerts: () => Promise.resolve([...REFILL_ALERTS]),
    getStats: () => Promise.resolve({
        ordersToday: 42,
        pending: 15,
        alerts: 8
    }),
    updateOrderStatus: (id, status) => {
        // Simulate API call
        console.log(`Order ${id} updated to ${status}`);
        return Promise.resolve({ success: true, id, status });
    }
};
