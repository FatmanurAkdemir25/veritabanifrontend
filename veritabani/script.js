// Kullanıcı giriş kontrolü
function login(username, password) {
    return fetch('https://a57d4c4d-0af2-4bce-b66c-4b0aa6b4174c.mock.pstmn.io/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Giriş başarısız! Kullanıcı adı veya şifre hatalı.');
        }
        return response.json();
    });
}

// Öğrenci detaylarını al
function fetchStudentDetails(studentId) {
    return fetch('https://a57d4c4d-0af2-4bce-b66c-4b0aa6b4174c.mock.pstmn.io/students/${studentId}')
        .then(response => response.json());
}

// Öğrenciye atanmış dersleri listele
function fetchAssignedCourses(studentId) {
    return fetch('https://a57d4c4d-0af2-4bce-b66c-4b0aa6b4174c.mock.pstmn.io/students/${studentId}')
        .then(response => response.json())
        .then(data => data.courses);
}

// Tüm dersleri listele
function fetchAllCourses() {
    return fetch('https://a57d4c4d-0af2-4bce-b66c-4b0aa6b4174c.mock.pstmn.io/courses')
        .then(response => response.json());
}

// Yeni ders ekle
function assignCoursesToStudent(studentId, courseIds) {
    return fetch('https://a57d4c4d-0af2-4bce-b66c-4b0aa6b4174c.mock.pstmn.io/students/${studentId}/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courses: courseIds }),
    });
}

// Danışmana bağlı öğrencileri al
function fetchAdvisorDetails(advisorId) {
    return fetch('https://a57d4c4d-0af2-4bce-b66c-4b0aa6b4174c.mock.pstmn.io/advisors/${advisorId}')
        .then(response => response.json());
}

// HTML'e veriyi yazdırma (örn: Öğrenci derslerini listeleme)
function displayCourses(courses, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Mevcut listeyi temizle

    courses.forEach(course => {
        const li = document.createElement('li');
        li.textContent = course.courseName;
        container.appendChild(li);
    });
}

// Öğrenci giriş kontrolü ve yönlendirme
if (window.location.pathname.includes('index.html')) {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        login(username, password)
            .then(data => {
                if (data.userType === 'student') {
                    window.location.href = 'student.html?studentId=${data.userId}';
                } else if (data.userType === 'advisor') {
                    window.location.href = 'advisor.html?advisorId=${data.userId}';
                }
            })
            .catch(error => {
                document.getElementById('errorMessage').textContent = error.message;
            });
    });
}

// Öğrenci sayfası işlevleri
if (window.location.pathname.includes('student.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('studentId');

    // Atanan dersleri ve yeni dersleri yükle
    fetchStudentDetails(studentId)
        .then(data => displayCourses(data.courses, 'assignedCourses'));

    fetchAllCourses()
        .then(courses => {
            const availableCourses = document.getElementById('availableCourses');
            courses.forEach(course => {
                const li = document.createElement('li');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = course.courseId;
                li.appendChild(checkbox);
                li.appendChild(document.createTextNode(` ${course.courseName}`));
                availableCourses.appendChild(li);
            });
        });

    // Dersleri gönderme
    document.getElementById('submitCourses').addEventListener('click', () => {
        const selectedCourses = Array.from(document.querySelectorAll('#availableCourses input:checked'))
            .map(checkbox => checkbox.value);

        assignCoursesToStudent(studentId, selectedCourses)
            .then(() => alert('Dersler başarıyla gönderildi!'))
            .catch(() => alert('Ders gönderilirken hata oluştu!'));
    });
}

// Danışman sayfası işlevleri
if (window.location.pathname.includes('advisor.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const advisorId = urlParams.get('advisorId');

    fetchAdvisorDetails(advisorId)
        .then(data => {
            const studentList = document.getElementById('studentList');
            data.students.forEach(student => {
                const li = document.createElement('li');
                li.textContent = 'Ad: ${student.name}, Dersler: ${student.courses.map(c => c.courseName).join(', ')}';
                studentList.appendChild(li);
            });
        });
}