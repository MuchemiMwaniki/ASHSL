document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to dark
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
    } else {
        // Default to dark theme if no preference is set (or 'light' was explicitly saved)
        // If you want default to light, remove this else block
        body.classList.remove('dark-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });

    // Highlight active navigation link
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav .nav-list a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });


    // Scroll To Top/Bottom Buttons Logic
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    const scrollToBottomBtn = document.getElementById('scroll-to-bottom-btn');

    const toggleScrollButtons = () => {
        if (window.scrollY > 300) { // Show after scrolling 300px
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }

        // Show scroll-to-bottom if not at the very bottom
        if ((window.innerHeight + window.scrollY) < document.body.offsetHeight - 100) {
            scrollToBottomBtn.classList.add('show');
        } else {
            scrollToBottomBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleScrollButtons);
    toggleScrollButtons(); // Initial check

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToBottomBtn.addEventListener('click', () => {
        window.scrollTo({
            top: document.body.offsetHeight,
            behavior: 'smooth'
        });
    });

    // AI Chatbot Logic
    const chatbotToggleBtn = document.querySelector('.chatbot-toggle-btn');
    const chatbotPopup = document.querySelector('.chatbot-popup');
    const chatbotCloseBtn = document.querySelector('.chatbot-close-btn');
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotSendBtn = document.querySelector('.chatbot-send-btn');
    const chatbotMessages = document.querySelector('.chatbot-messages');

    chatbotToggleBtn.addEventListener('click', () => {
        chatbotPopup.classList.toggle('active');
    });

    chatbotCloseBtn.addEventListener('click', () => {
        chatbotPopup.classList.remove('active');
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    chatbotSendBtn.addEventListener('click', sendMessage);

    function sendMessage() {
        const userMessage = chatbotInput.value.trim();
        if (userMessage === '') return;

        appendMessage(userMessage, 'user-message');
        chatbotInput.value = '';
        respondToUser(userMessage);
    }

    function appendMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.textContent = text;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll to bottom
    }

    function respondToUser(userMessage) {
        let botResponse = "I'm sorry, I don't understand that. Please try asking about 'new parts', 'used parts', 'brands', 'quote', or 'contact'.";
        const lowerCaseMessage = userMessage.toLowerCase();

        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            botResponse = "Hello! How can I assist you with auto spare parts today?";
        } else if (lowerCaseMessage.includes('new parts')) {
            botResponse = "We deal in a wide range of new spare parts directly sourced from manufacturers. What specific part are you looking for?";
        } else if (lowerCaseMessage.includes('used parts')) {
            botResponse = "Yes, we also offer quality used spare parts that are thoroughly inspected. They are a great cost-effective option!";
        } else if (lowerCaseMessage.includes('brands')) {
            botResponse = "We work with many popular brands like Toyota, Nissan, Mercedes-Benz, BMW, Ford, and more. You can see a full list on our About Us page!";
        } else if (lowerCaseMessage.includes('quote') || lowerCaseMessage.includes('price') || lowerCaseMessage.includes('cost')) {
            botResponse = "For a detailed quote, please visit our 'Request a Quote' page. We'll need your vehicle's chassis number and the part description.";
        } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('reach out')) {
            botResponse = "You can contact us via phone at 0799495876, 0721491732, or 0734860036, or email us at autoservenhw@yahoo.com. Our 'Contact Us' page has all the details!";
        } else if (lowerCaseMessage.includes('location') || lowerCaseMessage.includes('address')) {
            botResponse = "Our physical address is [Your Physical Address Here]. Please check our 'Contact Us' page for more details and working hours.";
        } else if (lowerCaseMessage.includes('stock') || lowerCaseMessage.includes('available')) {
            botResponse = "Our stock changes frequently. You can check our 'Parts & Stock' page for general categories, but for specific availability, please use the 'Request a Quote' form.";
        } else if (lowerCaseMessage.includes('3d model') || lowerCaseMessage.includes('car model') || lowerCaseMessage.includes('2d model')) {
             botResponse = "We're exploring interactive car models to help you identify parts. For now, check our 'Parts & Stock' page for general categories and highlights. For a specific part, please request a quote!";
        }


        setTimeout(() => {
            appendMessage(botResponse, 'bot-message');
        }, 500); // Simulate typing delay
    }

    // Drag functionality for chatbot (optional, needs more robust implementation for real use)
    let isDragging = false;
    let offsetX, offsetY;

    let chatbotHeader = document.querySelector('.chatbot-header'); // Re-select inside function or ensure global

    chatbotHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - chatbotPopup.getBoundingClientRect().left;
        offsetY = e.clientY - chatbotPopup.getBoundingClientRect().top;
        chatbotPopup.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        chatbotPopup.style.left = `${e.clientX - offsetX}px`;
        chatbotPopup.style.top = `${e.clientY - offsetY}px`;
        chatbotPopup.style.right = 'auto'; // Disable right positioning during drag
        chatbotPopup.style.bottom = 'auto'; // Disable bottom positioning during drag
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        chatbotPopup.style.cursor = 'grab';
    });


    // Populate quote form from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const partName = urlParams.get('part');
    if (partName) {
        const partDescriptionField = document.getElementById('part-description');
        if (partDescriptionField) {
            partDescriptionField.value = `Looking for: ${decodeURIComponent(partName)}`;
        }
    }
});
