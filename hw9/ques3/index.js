const container = document.getElementById('stepsContainer');
const stepIndicators = document.querySelectorAll('.step');
const stepContents = document.querySelectorAll('.step-content');
let currentStep = 0;

function updateScroll() {
    const width = container.offsetWidth;
    container.scrollTo({
        left: currentStep * width,
        behavior: 'smooth'
    });
    updateStepsUI();
}

function updateStepsUI() {
    stepIndicators.forEach((step, index) => {
        const circle = step.querySelector('.step-circle');
        step.classList.remove('active', 'completed');

        if (index < currentStep) {
            step.classList.add('completed');
            if (circle) circle.innerHTML = '<i class="fa fa-check"></i>';
        } else if (index === currentStep) {
            step.classList.add('active');
            if (circle) circle.textContent = index + 1;
        } else {
            if (circle) circle.textContent = index + 1;
        }
    });
}

function nextStep() {
    if (currentStep < stepContents.length - 1) {
        currentStep++;
        updateScroll();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        updateScroll();
    }
}

function Reset() {
    currentStep = 0;
    updateScroll();
}

// Event delegation برای همه دکمه‌ها
document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-next')) {
        nextStep();
        addClickEffect(e.target);
    }
    if (e.target.classList.contains('btn-prev')) {
        prevStep();
        addClickEffect(e.target);
    }
    if (e.target.classList.contains('btn-Reset')) {
        Reset();
        addClickEffect(e.target);
    }
});

function addClickEffect(button) {
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 500);
}

// اجرای اولیه
updateStepsUI();