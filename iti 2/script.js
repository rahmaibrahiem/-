// بيانات التطبيق
let clothesPosts = [];
let ridesPosts = [];
let advicePosts = [
    {
        id: 1,
        title: "كيف أبدأ مشروعي الصغير من المنزل؟",
        content: "أرغب في بدء مشروع صغير من المنزل لبيع الحلويات المنزلية، ولكن لا أعرف من أين أبدأ. هل لدى أحدكن نصائح حول كيفية التسويق عبر الإنترنت والحصول على أول عملاء؟",
        author: "سارة محمد",
        date: new Date().toLocaleDateString('ar-EG'),
        comments: 5,
        userId: null
    }
];
let projectsPosts = [
    {
        id: 1,
        name: "حلويات بيتي",
        category: "طعام",
        description: "مشروع صغير لصنع الحلويات المنزلية بجودة عالية ونكهات مميزة. نقدم تشكيلة متنوعة من الكيكات والكب كيك والحلويات الشرقية.",
        owner: "أميرة أحمد",
        contact: "01001234567",
        image: "https://images.unsplash.com/photo-1552689486-f6773047d19f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        userId: null,
        postDate: new Date().toISOString()
    }
];
let donationsPosts = [
    {
        id: 1,
        title: "مساعدة أم غارمة في تسديد ديونها",
        description: "جمع تبرعات لمساعدة أم غارمة على تسديد ديون زوجها المتوفى والتي تبلغ 50,000 جنيه لتستطيع تربية أطفالها الخمسة بكرامة",
        target: 50000,
        collected: 12000,
        image: "https://images.unsplash.com/photo-1529635769365-75a8eda72430?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    }
];
let users = [];
let currentUser = null;
let isLoggedIn = false;

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
});

function loadData() {
    // تحميل المستخدم الحالي من localStorage
    if(localStorage.getItem('currentUser')) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
        isLoggedIn = true;
        updateAuthUI();
    }
    
    // تحميل البيانات من localStorage
    if(localStorage.getItem('clothesPosts')) {
        clothesPosts = JSON.parse(localStorage.getItem('clothesPosts'));
    } else {
        // بيانات افتراضية
        clothesPosts = [
            {
                id: 1,
                title: "جاكيت شتوي بحالة جيدة",
                size: "M",
                city: "القاهرة",
                description: "جاكيت شتوي لون بيج بحالة ممتازة، مقاس M مناسب للطول 160-170سم",
                contact: "01001234567",
                image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                userId: null,
                date: new Date().toISOString()
            }
        ];
    }

    if(localStorage.getItem('ridesPosts')) {
        ridesPosts = JSON.parse(localStorage.getItem('ridesPosts'));
    } else {
        ridesPosts = [
            {
                id: 1,
                from: "مدينة نصر",
                to: "المعادي",
                date: new Date().toLocaleDateString('ar-EG'),
                time: "08:00 ص",
                seats: 3,
                contact: "01001234567",
                notes: "السيارة تويوتا كورولا لون أبيض",
                userId: null,
                postDate: new Date().toISOString()
            }
        ];
    }

    if(localStorage.getItem('advicePosts')) {
        advicePosts = JSON.parse(localStorage.getItem('advicePosts'));
    }

    if(localStorage.getItem('projectsPosts')) {
        projectsPosts = JSON.parse(localStorage.getItem('projectsPosts'));
    }

    if(localStorage.getItem('donationsPosts')) {
        donationsPosts = JSON.parse(localStorage.getItem('donationsPosts'));
    }

    if(localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'));
    }

    // عرض البيانات
    displayClothes();
    displayRides();
    displayAdvice();
    displayProjects();
    displayDonations();
}

function setupEventListeners() {
    //  تسجيل الدخول والتسجيل
    document.getElementById('auth-btn').addEventListener('click', function(e) {
        e.preventDefault();
        if(isLoggedIn) {
            logout();
        } else {
            document.getElementById('login-modal').style.display = 'block';
        }
    });

    document.getElementById('show-login').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('register-modal').style.display = 'none';
        document.getElementById('login-modal').style.display = 'block';
    });

    document.getElementById('show-register').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('login-modal').style.display = 'none';
        document.getElementById('register-modal').style.display = 'block';
    });

    // النماذج
    document.getElementById('register-form').addEventListener('submit', registerUser);
    document.getElementById('login-form').addEventListener('submit', loginUser);
    document.getElementById('add-clothes-form').addEventListener('submit', addClothes);
    document.getElementById('add-ride-form').addEventListener('submit', addRide);
    document.getElementById('add-project-form').addEventListener('submit', addProject);
    document.getElementById('donate-form').addEventListener('submit', donate);
    document.getElementById('post-advice-btn').addEventListener('click', postAdvice);

    // الأزرار
    document.getElementById('add-clothes-btn').addEventListener('click', function() {
        if(checkAuth()) {
            document.getElementById('clothes-modal').style.display = 'block';
        }
    });

    document.getElementById('add-ride-btn').addEventListener('click', function() {
        if(checkAuth()) {
            document.getElementById('ride-modal').style.display = 'block';
        }
    });

    document.getElementById('add-project-btn').addEventListener('click', function() {
        if(checkAuth()) {
            document.getElementById('project-modal').style.display = 'block';
        }
    });

    // رفع الصور
    document.getElementById('clothes-image').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function(event) {
               //معاينة الصوره
            };
            reader.readAsDataURL(file);
        }
    });
    
    document.getElementById('project-image').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function(event) {
            //معاية الصورة
            };
            reader.readAsDataURL(file);
        }
    });

    // قفل المودال لما ادوس خارج المحتوى
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if(e.target === this) {
                this.style.display = 'none';
            }
        });
    });

    // قفل المودال لما ادوس على زرار الإغلاق
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // الفلاتر
    document.getElementById('city-filter').addEventListener('change', displayClothes);
    document.getElementById('size-filter').addEventListener('change', displayClothes);
}

// تاكيد الهويه
function checkAuth() {
    if(!isLoggedIn) {
        alert('يجب تسجيل الدخول أولاً');
        document.getElementById('login-modal').style.display = 'block';
        return false;
    }
    return true;
}

function registerUser(e) {
    e.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    
    // التحقق من البريد الإلكتروني
    if(users.some(user => user.email === email)) {
        alert('هذا البريد الإلكتروني مسجل بالفعل!');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name,
        email,
        phone,
        password,
        isAdmin: false
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // تسجيل الدخول تلقائياً بعد التسجيل
    loginAfterRegister(newUser);
}

function loginAfterRegister(user) {
    currentUser = user;
    isLoggedIn = true;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    updateAuthUI();
    alert('تم التسجيل بنجاح!');
    document.getElementById('register-modal').style.display = 'none';
    document.getElementById('register-form').reset();
}

function loginUser(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if(user) {
        currentUser = user;
        isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        updateAuthUI();
        alert('تم تسجيل الدخول بنجاح!');
        document.getElementById('login-modal').style.display = 'none';
        document.getElementById('login-form').reset();
    } else {
        alert('البريد الإلكتروني أو كلمة المرور غير صحيحة!');
    }
}

function logout() {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('currentUser');
    
    updateAuthUI();
    alert('تم تسجيل الخروج بنجاح');
}

function updateAuthUI() {
    const authBtn = document.getElementById('auth-btn');
    
    if(isLoggedIn && currentUser) {
        authBtn.textContent = currentUser.name;
    } else {
        authBtn.textContent = 'تسجيل الدخول';
    }
}

// لما اضيف محتوى جديد
function addClothes(e) {
    e.preventDefault();
    
    if(!checkAuth()) return;
    
    const imageInput = document.getElementById('clothes-image');
    const imageFile = imageInput.files[0];
    
    let imageUrl = "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"; // صورة افتراضية
    
    if(imageFile) {
    
        imageUrl = URL.createObjectURL(imageFile); // بتعرض الصورة مؤقتاً
    }
    
    const newPost = {
        id: Date.now(),
        title: document.getElementById('clothes-type').value,
        size: document.getElementById('clothes-size').value,
        city: document.getElementById('clothes-city').value,
        description: document.getElementById('clothes-desc').value,
        contact: currentUser.phone,
        image: imageUrl,
        userId: currentUser.id,
        date: new Date().toISOString()
    };
    
    clothesPosts.push(newPost);
    localStorage.setItem('clothesPosts', JSON.stringify(clothesPosts));
    
    displayClothes();
    document.getElementById('clothes-modal').style.display = 'none';
    document.getElementById('add-clothes-form').reset();
    alert('تمت إضافة الملابس بنجاح!');
}

function addRide(e) {
    e.preventDefault();
    
    if(!checkAuth()) return;
    
    const date = new Date(document.getElementById('ride-date').value);
    const formattedDate = date.toLocaleDateString('ar-EG');
    
    const newRide = {
        id: Date.now(),
        from: document.getElementById('ride-from').value,
        to: document.getElementById('ride-to').value,
        date: formattedDate,
        time: document.getElementById('ride-time').value,
        seats: parseInt(document.getElementById('ride-seats').value),
        notes: document.getElementById('ride-notes').value,
        contact: currentUser.phone,
        userId: currentUser.id,
        postDate: new Date().toISOString()
    };
    
    ridesPosts.push(newRide);
    localStorage.setItem('ridesPosts', JSON.stringify(ridesPosts));
    
    displayRides();
    document.getElementById('ride-modal').style.display = 'none';
    document.getElementById('add-ride-form').reset();
    alert('تمت إضافة الرحلة بنجاح!');
}

function addProject(e) {
    e.preventDefault();
    
    if(!checkAuth()) return;
    
    const imageInput = document.getElementById('project-image');
    const imageFile = imageInput.files[0];
    
    let imageUrl = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"; // صورة افتراضية
    
    if(imageFile) {

        imageUrl = URL.createObjectURL(imageFile); // بتعرض الصورة مؤقتاً
    }
    
    const newProject = {
        id: Date.now(),
        name: document.getElementById('project-name').value,
        category: document.getElementById('project-category').value,
        description: document.getElementById('project-desc').value,
        owner: currentUser.name,
        contact: currentUser.phone,
        image: imageUrl,
        userId: currentUser.id,
        postDate: new Date().toISOString()
    };
    
    projectsPosts.push(newProject);
    localStorage.setItem('projectsPosts', JSON.stringify(projectsPosts));
    
    displayProjects();
    document.getElementById('project-modal').style.display = 'none';
    document.getElementById('add-project-form').reset();
    alert('تمت إضافة المشروع بنجاح!');
}

function donate(e) {
    e.preventDefault();
    
    if(!checkAuth()) return;
    
    const amount = parseInt(document.getElementById('donate-amount').value);
    const method = document.getElementById('donate-method').value;
    
    // هنا بقدر إضيف كود للاتصال ببوابة الدفع
    alert(`شكراً لتبرعك بمبلغ ${amount} جنيهاً\nسيتم تحويلك لصفحة الدفع عبر ${method}`);
    
    // زيادة المبلغ 
    if(donationsPosts.length > 0) {
        donationsPosts[0].collected += amount;
        localStorage.setItem('donationsPosts', JSON.stringify(donationsPosts));
        displayDonations();
    }
    
    document.getElementById('donate-modal').style.display = 'none';
    document.getElementById('donate-form').reset();
}

function postAdvice() {
    const title = document.getElementById('advice-title').value;
    const content = document.getElementById('advice-content').value;
    
    if(!title || !content) {
        alert('الرجاء إدخال عنوان ومحتوى الاستشارة');
        return;
    }
    
    const newAdvice = {
        id: Date.now(),
        title,
        content,
        author: currentUser ? currentUser.name : "مستخدم",
        date: new Date().toLocaleDateString('ar-EG'),
        comments: 0,
        userId: currentUser?.id || null
    };
    
    advicePosts.push(newAdvice);
    localStorage.setItem('advicePosts', JSON.stringify(advicePosts));
    
    displayAdvice();
    document.getElementById('advice-title').value = '';
    document.getElementById('advice-content').value = '';
    alert('شكراً لمشاركة استشارتك!');
}

// العرض
function displayClothes() {
    const container = document.getElementById('clothes-container');
    if(!container) return;
    
    container.innerHTML = '';
    
    const cityFilter = document.getElementById('city-filter')?.value || '';
    const sizeFilter = document.getElementById('size-filter')?.value || '';
    
    const filteredClothes = clothesPosts.filter(post => {
        return (!cityFilter || post.city === cityFilter) && 
               (!sizeFilter || post.size === sizeFilter);
    });
    
    if(filteredClothes.length === 0) {
        container.innerHTML = '<p class="no-results">لا توجد نتائج مطابقة للبحث</p>';
        return;
    }
    
    filteredClothes.forEach(post => {
        const card = document.createElement('div');
        card.className = 'clothes-card';
        
        //  زرار الحذف لو كان المستخدم هو صاحب الإعلان
        const deleteButton = (post.userId === currentUser?.id) ? 
            `<button class="delete-btn" onclick="deleteItem('clothes', ${post.id})">
                <i class="fas fa-trash"></i> حذف
            </button>` : '';
        
        card.innerHTML = `
            <div class="clothes-img" style="background-image: url('${post.image}')"></div>
            <div class="clothes-info">
                <h3>${post.title}</h3>
                <p><strong>المقاس:</strong> ${post.size}</p>
                <p><strong>المدينة:</strong> ${post.city}</p>
                <p>${post.description}</p>
                <div class="card-actions">
                    <button class="contact-btn" onclick="showContact('${post.contact}')">تواصل مع صاحبة الإعلان</button>
                    ${deleteButton}
                </div>
            </div>
        `;
        
        // كلمة "جديد" للإعلانات اللي لسه معموله (أقل من أسبوع)
        const postDate = new Date(post.date || post.postDate);
        if(Date.now() - postDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
            const badge = document.createElement('span');
            badge.className = 'new-badge';
            badge.textContent = 'جديد';
            card.appendChild(badge);
        }
        
        container.appendChild(card);
    });
}

function displayRides() {
    const container = document.getElementById('rides-container');
    if(!container) return;
    
    container.innerHTML = '';
    
    ridesPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'ride-card';
        
        //  زرار الحذف لو كان المستخدم هو صاحب الرحلة
        const deleteButton = (post.userId === currentUser?.id) ? 
            `<button class="delete-btn" onclick="deleteItem('rides', ${post.id})">
                <i class="fas fa-trash"></i> حذف
            </button>` : '';
        
        card.innerHTML = `
            <div class="ride-info">
                <h3>رحلة من ${post.from} إلى ${post.to}</h3>
                <p><strong>التاريخ:</strong> ${post.date}</p>
                <p><strong>الوقت:</strong> ${post.time}</p>
                <p><strong>المقاعد المتاحة:</strong> ${post.seats}</p>
                <div class="route">
                    <span>${post.from}</span>
                    <i class="fas fa-arrow-left"></i>
                    <span>${post.to}</span>
                </div>
                <p>${post.notes}</p>
                <div class="card-actions">
                    <button class="join-btn" onclick="showContact('${post.contact}')">انضمي للرحلة</button>
                    ${deleteButton}
                </div>
            </div>
        `;
        
        // كلمة جديد للرحلات اللي لسه معموله
        const postDate = new Date(post.postDate);
        if(Date.now() - postDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
            const badge = document.createElement('span');
            badge.className = 'new-badge';
            badge.textContent = 'جديد';
            card.appendChild(badge);
        }
        
        container.appendChild(card);
    });
}

function displayAdvice() {
    const container = document.getElementById('advice-container');
    if(!container) return;
    
    container.innerHTML = '';
    
    advicePosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'advice-card';
        
        //  زرار الحذف لو كان المستخدم هو صاحب الاستشارة
        const deleteButton = (post.userId === currentUser?.id) ? 
            `<button class="delete-btn" onclick="deleteItem('advice', ${post.id})">
                <i class="fas fa-trash"></i> حذف
            </button>` : '';
        
        card.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <div class="advice-meta">
                <span>${post.author}</span>
                <span>${post.date}</span>
            </div>
            <div class="advice-actions">
                <button><i class="far fa-comment"></i> ${post.comments} تعليق</button>
                <button><i class="far fa-share-square"></i> مشاركة</button>
                ${deleteButton}
            </div>
        `;
        container.appendChild(card);
    });
}

function displayProjects() {
    const container = document.getElementById('projects-container');
    if(!container) return;
    
    container.innerHTML = '';
    
    projectsPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        //  زرار الحذف لو كان المستخدم هو صاحب المشروع
        const deleteButton = (post.userId === currentUser?.id) ? 
            `<button class="delete-btn" onclick="deleteItem('projects', ${post.id})">
                <i class="fas fa-trash"></i> حذف
            </button>` : '';
        
        card.innerHTML = `
            <div class="project-img" style="background-image: url('${post.image}')"></div>
            <div class="project-info">
                <span class="project-category">${post.category}</span>
                <h3>${post.name}</h3>
                <p>${post.description}</p>
                <div class="card-actions">
                    <button class="contact-btn" onclick="showContact('${post.contact}')">تواصل مع صاحبة المشروع</button>
                    ${deleteButton}
                </div>
            </div>
        `;
        
        //كلمة جديد للمشاريع اللي لسه معموله
        const postDate = new Date(post.postDate);
        if(Date.now() - postDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
            const badge = document.createElement('span');
            badge.className = 'new-badge';
            badge.textContent = 'جديد';
            card.appendChild(badge);
        }
        
        container.appendChild(card);
    });
}

function displayDonations() {
    const container = document.getElementById('donations-container');
    if(!container) return;
    
    container.innerHTML = '';
    
    donationsPosts.forEach(post => {
        const progress = Math.min(100, (post.collected / post.target) * 100);
        const card = document.createElement('div');
        card.className = 'donation-card';
        
        //  زرار الحذف لو كان المستخدم هو المسؤول
        const deleteButton = (currentUser?.isAdmin) ? 
            `<button class="delete-btn" onclick="deleteItem('donations', ${post.id})">
                <i class="fas fa-trash"></i> حذف
            </button>` : '';
        
        card.innerHTML = `
            <div class="donation-img" style="background-image: url('${post.image}')"></div>
            <div class="donation-info">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${progress}%"></div>
                    </div>
                    <div class="progress-text">
                        <span>${post.collected.toLocaleString()} ج.م</span>
                        <span>${post.target.toLocaleString()} ج.م</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="donate-btn" onclick="document.getElementById('donate-modal').style.display='block'">تبرعي الآن</button>
                    ${deleteButton}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// الحذف
function deleteItem(type, id) {
    if (!checkAuth()) return;
    
    if (confirm('هل أنت متأكدة من أنك تريد حذف هذا العنصر؟')) {
        let collection;
        switch (type) {
            case 'clothes':
                collection = clothesPosts;
                break;
            case 'rides':
                collection = ridesPosts;
                break;
            case 'advice':
                collection = advicePosts;
                break;
            case 'projects':
                collection = projectsPosts;
                break;
            case 'donations':
                collection = donationsPosts;
                break;
            default:
                return;
        }

        const index = collection.findIndex(item => item.id === id);
        
        // بيتاكد من أن المستخدم هو صاحب المحتوى أو مسؤول
        if (index !== -1 && (collection[index].userId === currentUser.id || currentUser.isAdmin)) {
            collection.splice(index, 1);
            localStorage.setItem(`${type}Posts`, JSON.stringify(collection));
            
            // إعادة عرض المحتوى المحدث
            switch (type) {
                case 'clothes':
                    displayClothes();
                    break;
                case 'rides':
                    displayRides();
                    break;
                case 'advice':
                    displayAdvice();
                    break;
                case 'projects':
                    displayProjects();
                    break;
                case 'donations':
                    displayDonations();
                    break;
            }
            
            alert('تم الحذف بنجاح');
        } else {
            alert('ليس لديك صلاحية حذف هذا العنصر');
        }
    }
}

//  مساعدة
function showContact(contact) {
    if(!checkAuth()) return;
    
    // إخفاء جزء من الرقم لحماية الخصوصية
    const hiddenContact = contact.slice(0, 4) + '****' + contact.slice(8);
    alert(`رقم الاتصال: ${hiddenContact}\n\nسيتم إرسال الرقم الكامل إلى بريدك الإلكتروني`);
    
    // هنا بقدر إضيف كود لإرسال التفاصيل الكاملة إلى البريد الإلكتروني للمستخدم
}

//  الدوال متاحة عالمياً
window.showContact = showContact;
window.deleteItem = deleteItem;