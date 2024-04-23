document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    var years = parseInt(document.getElementById('years').value);
    var sipAmount = parseFloat(document.getElementById('sip-amount').value);
    var interestRate = parseFloat(document.getElementById('interest-rate').value);
    var inflationRate = parseFloat(document.getElementById('inflation-rate').value);

    // Calculate portfolio values
    var portfolioValues = calculateSipValue(years, sipAmount, interestRate, inflationRate);

    // Plot the Portfolio Values using Plotly
    var layout = {
        title: 'Portfolio Value Over Years',
        xaxis: { title: 'Years' },
        yaxis: { title: 'Portfolio Value' }
    };
    Plotly.newPlot('plotly-chart', [{ x: Array.from({length: years}, (_, i) => i+1), y: portfolioValues, mode: 'lines+markers' }], layout);
});

function calculateSipValue(years, sipAmount, interestRate, inflationRate) {
    var sipValues = [];
    var portfolioValues = [];
    var currentValue = 0;
    for (var year = 1; year <= years; year++) {
        currentValue += sipAmount;
        currentValue *= (1 + (interestRate - inflationRate) / 100);
        sipValues.push(currentValue);
        portfolioValues.push(currentValue * Math.pow((1 + inflationRate / 100), year));
    }
    return portfolioValues;
}
