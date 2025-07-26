document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close nav when a link is clicked (for single-page navigation or after navigating)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // Theme Toggle
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    } else {
        // Default to dark theme if no preference is saved
        body.classList.add('dark-theme');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            // Save preference to localStorage
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark-theme');
            } else {
                localStorage.setItem('theme', 'light-theme');
            }
        });
    }

    // Scroll to Top/Bottom Buttons functionality
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollToBottomBtn = document.getElementById('scrollToBottomBtn');

    const toggleScrollButtons = () => {
        if (window.scrollY > 300) { // Show after scrolling 300px down
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }

        // Show scroll-to-bottom only if not at the very bottom
        if ((window.innerHeight + window.scrollY) < document.body.offsetHeight - 100) {
            scrollToBottomBtn.classList.add('show');
        } else {
            scrollToBottomBtn.classList.remove('show');
        }
    };

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    if (scrollToBottomBtn) {
        scrollToBottomBtn.addEventListener('click', () => {
            window.scrollTo({
                top: document.body.offsetHeight,
                behavior: 'smooth'
            });
        });
    }

    // Listen for scroll events to show/hide buttons
    window.addEventListener('scroll', toggleScrollButtons);
    // Initial check on page load
    toggleScrollButtons();


    // AI Chatbot Functionality (Placeholder)
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotPopup = document.getElementById('chatbotPopup');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');

    if (chatbotToggle && chatbotPopup && chatbotClose && chatbotInput && chatbotSend && chatbotMessages) {
        chatbotToggle.addEventListener('click', () => {
            chatbotPopup.classList.toggle('active');
            if (chatbotPopup.classList.contains('active')) {
                chatbotInput.focus(); // Focus on input when opened
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
            }
        });

        chatbotClose.addEventListener('click', () => {
            chatbotPopup.classList.remove('active');
        });

        const sendMessage = () => {
            const messageText = chatbotInput.value.trim();
            if (messageText !== '') {
                // Add user message to chat
                const userMessageDiv = document.createElement('div');
                userMessageDiv.classList.add('message', 'user-message');
                userMessageDiv.textContent = messageText;
                chatbotMessages.appendChild(userMessageDiv);
                chatbotInput.value = ''; // Clear input

                // Simulate bot response (replace with actual AI integration later)
                setTimeout(() => {
                    const botMessageDiv = document.createElement('div');
                    botMessageDiv.classList.add('message', 'bot-message');
                    // Simple example response logic
                    if (messageText.toLowerCase().includes('hello') || messageText.toLowerCase().includes('hi')) {
                        botMessageDiv.textContent = 'Hello there! How can I help you find auto parts today?';
                    } else if (messageText.toLowerCase().includes('part number')) {
                        botMessageDiv.textContent = 'Please provide the part number, and I\'ll check our stock or help you find it!';
                    } else if (messageText.toLowerCase().includes('catalogue')) {
                        botMessageDiv.textContent = 'You can browse our full catalogue by clicking the "Catalogue" link in the navigation menu.';
                    } else if (messageText.toLowerCase().includes('quote')) {
                        botMessageDiv.textContent = 'To get a custom quote, please visit our "Get a Quote" page from the navigation bar.';
                    } else if (messageText.toLowerCase().includes('contact')) {
                        botMessageDiv.textContent = 'You can find our contact details, including phone numbers and email, on the "Contact Us" page.';
                    }
                    else {
                        botMessageDiv.textContent = 'I am an AI assistant for auto parts. How else can I assist you?';
                    }
                    chatbotMessages.appendChild(botMessageDiv);
                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom after new message
                }, 500); // Simulate network delay
            }
        };

        chatbotSend.addEventListener('click', sendMessage);

        chatbotInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });

        // Chatbot Drag functionality
        let isDragging = false;
        let offset = { x: 0, y: 0 };

        const startDrag = (e) => {
            isDragging = true;
            offset = {
                x: e.clientX - chatbotPopup.getBoundingClientRect().left,
                y: e.clientY - chatbotPopup.getBoundingClientRect().top
            };
            chatbotPopup.style.cursor = 'grabbing';
        };

        const onDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent text selection etc.
            chatbotPopup.style.left = (e.clientX - offset.x) + 'px';
            chatbotPopup.style.top = (e.clientY - offset.y) + 'px';
        };

        const endDrag = () => {
            isDragging = false;
            chatbotPopup.style.cursor = 'grab';
        };

        const chatbotHeader = document.querySelector('.chatbot-header');
        if (chatbotHeader) {
            chatbotHeader.addEventListener('mousedown', startDrag);
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', endDrag);
        }
    }
});
