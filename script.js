    // ===== MOBILE NAVIGATION TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const fadeElements = document.querySelectorAll('.fade-in');

const checkScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if(elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

// Check on load and scroll
window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);

// ===== PRODUCT SELECTION =====
const productButtons = document.querySelectorAll('.product-btn');
const sizeSelect = document.getElementById('size');
const quantityInput = document.getElementById('quantity');
const totalAmount = document.getElementById('totalAmount');

// Add product to order form when clicking "Add to Order"
productButtons.forEach(button => {
    button.addEventListener('click', () => {
        const size = button.getAttribute('data-size');
        const price = button.getAttribute('data-price');
        
        // Set the size in the dropdown
        sizeSelect.value = size;
        
        // Calculate and update total
        calculateTotal();
        
        // Scroll to order section
        document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
        
        // Highlight the selected product
        productButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// ===== CALCULATE ORDER TOTAL =====
function calculateTotal() {
    const size = sizeSelect.value;
    const quantity = parseInt(quantityInput.value) || 1;
    
    if (!size) {
        totalAmount.textContent = 'Total: ₹0';
        return;
    }
    
    // Extract price from selected option
    const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
    const priceText = selectedOption.textContent;
    const priceMatch = priceText.match(/₹(\d+)/);
    
    if (priceMatch) {
        const price = parseInt(priceMatch[1]);
        const total = price * quantity;
        totalAmount.textContent = `Total: ₹${total}`;
    }
}

// Update total when size or quantity changes
sizeSelect.addEventListener('change', calculateTotal);
quantityInput.addEventListener('input', calculateTotal);

// ===== ORDER FORM SUBMISSION =====
const orderForm = document.getElementById('orderForm');
const orderModal = document.getElementById('orderModal');
const closeModal = document.querySelector('.close-modal');
const orderDetails = document.getElementById('orderDetails');

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const size = sizeSelect.value;
    const quantity = quantityInput.value;
    
    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
    }
    
    // Calculate total for display
    const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
    const priceText = selectedOption.textContent;
    const priceMatch = priceText.match(/₹(\d+)/);
    const price = priceMatch ? parseInt(priceMatch[1]) : 0;
    const total = price * parseInt(quantity);
    
    // Set order details in modal
    orderDetails.innerHTML = `
        <p><strong>Thank you, ${name}!</strong></p>
        <p>Your order for <strong>${quantity} x ${size}</strong> Manthan bottles has been received.</p>
        <p>Order Total: <strong>₹${total}</strong></p>
        <p>We will contact you at <strong>${phone}</strong> for confirmation.</p>
        <p>Delivery Address: <strong>${address}</strong></p>
    `;
    
    // Show modal
    orderModal.style.display = 'flex';
    
    // Reset form
    orderForm.reset();
    totalAmount.textContent = 'Total: ₹0';
    productButtons.forEach(btn => btn.classList.remove('active'));
});

// Close modal
closeModal.addEventListener('click', () => {
    orderModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        orderModal.style.display = 'none';
    }
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('contactName').value || 'Customer';
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields before sending the message.');
        return;
    }
    
    // Show success message
    alert(`Thank you ${name}! Your message has been sent. We will respond within 24 hours.`);
    
    // Reset form
    contactForm.reset();
});

// ===== FORM VALIDATION FOR ORDER FORM =====
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', () => {
    const phoneValue = phoneInput.value;
    if (phoneValue.length > 10) {
        phoneInput.value = phoneValue.slice(0, 10);
    }
});

// ===== INITIALIZE ANIMATIONS ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    checkScroll();
    
    // Set current year in footer (optional)
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});