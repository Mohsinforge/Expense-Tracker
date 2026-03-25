document.addEventListener('DOMContentLoaded', () => {
    // Get all form elements
    const expenseForm = document.getElementById('expense-form');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    const categorySelect = document.getElementById('category');
    const amountInput = document.getElementById('amount');
    const expenseChart = document.getElementById('expense-chart');

    // Store all expenses
    let expenses = [];
    let chart = null;

    // Generate year options (2020-2040)
    for (let year = 2020; year <= 2040; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    // Set current year as default
    const currentYear = new Date().getFullYear();
    yearSelect.value = currentYear;

    // Handle form submission
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const month = monthSelect.value;
        const year = yearSelect.value;
        const category = categorySelect.value;
        const amount = parseFloat(amountInput.value);

        // Validate all fields
        if (!month || !year || !category || !amount || amount <= 0) {
            alert('Please fill in all fields with valid values');
            return;
        }

        // Add expense to array
        expenses.push({
            month: month,
            year: year,
            category: category,
            amount: amount
        });

        console.log('Expense added:', expenses);

        // Reset form but keep current year
        expenseForm.reset();
        yearSelect.value = currentYear;

        // Update the chart
        updateChart();
    });

    // Function to update/create chart
    function updateChart() {
        if (expenses.length === 0) {
            console.log('No expenses to display yet');
            return;
        }

        // Group expenses by category
        const categoryTotals = {};
        
        expenses.forEach(expense => {
            if (categoryTotals[expense.category]) {
                categoryTotals[expense.category] += expense.amount;
            } else {
                categoryTotals[expense.category] = expense.amount;
            }
        });

        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);

        console.log('Chart labels:', labels);
        console.log('Chart data:', data);

        // Destroy old chart if exists
        if (chart) {
            chart.destroy();
        }

        // Create new chart
        const ctx = expenseChart.getContext('2d');
        chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Expenses by Category',
                    data: data,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Expense Distribution'
                    }
                }
            }
        });

        console.log('Chart updated successfully!');
    }
});