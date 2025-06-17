var swiper = new Swiper(".home-slider", {
    loop:true,
    grabCursor:true,
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
    });

    
  var swiper = new Swiper(".about-slider", {
    loop:true,
    grabCursor:true,
    effect: "fade",
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    }
});


const observerOptions = {
    root: null,
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);


document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));

    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            
            timelineItems.forEach(i => i.classList.remove('active'));
            
            item.classList.add('active');
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const advantageBoxes = document.querySelectorAll('.advantage-box');

  
    advantageBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            const icon = box.querySelector('.icon i');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            box.style.backgroundColor = 'var(--accent-color)';
        });

        box.addEventListener('mouseleave', () => {
            const icon = box.querySelector('.icon i');
            icon.style.transform = 'scale(1) rotate(0deg)';
            box.style.backgroundColor = '#fff';
        });

       
        box.addEventListener('click', () => {
            const description = box.querySelector('p');
            const extraInfo = box.getAttribute('data-extra-info');
            
            if (!box.classList.contains('expanded')) {
                box.classList.add('expanded');
                description.setAttribute('data-original', description.textContent);
                description.textContent = extraInfo;
            } else {
                box.classList.remove('expanded');
                description.textContent = description.getAttribute('data-original');
            }
        });
    });

    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const advantageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    advantageBoxes.forEach(box => {
        box.style.transform = 'translateY(50px)';
        box.style.opacity = '0';
        box.style.transition = 'all 0.6s ease';
        advantageObserver.observe(box);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const groupSizeSelect = document.getElementById('groupSize');
    const participantsContainer = document.getElementById('participantsForms');
    const packageSelect = document.getElementById('packageSelect');

    // NIK Validation
    const nikInput = document.getElementById('leadNIK');
    nikInput.addEventListener('input', validateNIK);

    // Phone Number Validation
    const phoneInput = document.querySelector('input[name="leadPhone"]');
    phoneInput.addEventListener('input', validatePhone);

    // Group Size Change Handler
    groupSizeSelect.addEventListener('change', handleGroupSizeChange);

    // Package Selection Handler
    packageSelect.addEventListener('change', updateTotalPrice);

    // Form Submission Handler
    bookingForm.addEventListener('submit', handleSubmit);

    // Validation Functions
    function validateNIK(e) {
        const nik = e.target.value.replace(/\D/g, '');
        const nikError = document.getElementById('nikError');

        if (nik.length !== 16) {
            nikError.textContent = 'NIK must be exactly 16 digits';
            nikError.style.display = 'block';
            e.target.setCustomValidity('Invalid NIK');
        } else {
            nikError.style.display = 'none';
            e.target.setCustomValidity('');
        }
    }

    function validatePhone(e) {
        const phone = e.target.value.replace(/\D/g, '');
        if (!/^(\+62|62|0)[0-9]{9,12}$/.test(phone)) {
            e.target.setCustomValidity('Please enter a valid Indonesian phone number');
        } else {
            e.target.setCustomValidity('');
        }
    }

    function handleGroupSizeChange(e) {
        const size = parseInt(e.target.value);
        const additionalSection = document.getElementById('additionalParticipants');
        
        participantsContainer.innerHTML = '';
        
        if (size > 1) {
            additionalSection.classList.remove('hidden');
            
            for (let i = 2; i <= size; i++) {
                const participantHTML = `
                    <div class="participant-section">
                        <h4>Participant ${i}</h4>
                        <div class="form-grid">
                            <div class="form-group">
                                <input type="text" name="participant${i}Name" required>
                                <label>Full Name</label>
                            </div>
                            <div class="form-group">
                                <input type="text" 
                                    name="participant${i}NIK" 
                                    pattern="[0-9]{16}" 
                                    maxlength="16" 
                                    required>
                                <label>NIK (16 digits)</label>
                            </div>
                        </div>
                    </div>
                `;
                participantsContainer.insertAdjacentHTML('beforeend', participantHTML);
            }
        } else {
            additionalSection.classList.add('hidden');
        }
        
        updateTotalPrice();
    }

    function updateTotalPrice() {
        const packagePrices = {
            'sunrise': 850000,
            'adventure': 1500000,
            'luxury': 3200000
        };
        
        const selectedPackage = packageSelect.value;
        const groupSize = parseInt(groupSizeSelect.value) || 0;
        
        if (selectedPackage && groupSize) {
            const totalPrice = packagePrices[selectedPackage] * groupSize;
            const formattedPrice = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(totalPrice);
            
           
            const priceDisplay = document.createElement('div');
            priceDisplay.className = 'total-price';
            priceDisplay.textContent = `Total Price: ${formattedPrice}`;
            
            const existingPrice = document.querySelector('.total-price');
            if (existingPrice) {
                existingPrice.replaceWith(priceDisplay);
            } else {
                packageSelect.parentNode.appendChild(priceDisplay);
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        
        const fileInput = document.getElementById('paymentProof');
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const fileSize = file.size / 1024 / 1024; 
            
            if (fileSize > 5) {
                alert('File size should not exceed 5MB');
                return;
            }
            
            if (!file.type.match('image.*')) {
                alert('Please upload an image file');
                return;
            }
        }

       
        alert('Booking submitted successfully! We will contact you shortly.');
        bookingForm.reset();
    }
});