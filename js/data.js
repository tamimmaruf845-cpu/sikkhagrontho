const defaultData = {
    hscSubjects: [
        { id: 'hsc-1', title: 'Bangla', icon: 'অ,আ,ক' },
        { id: 'hsc-2', title: 'English', icon: 'abc' },
        { id: 'hsc-3', title: 'Higher Math', icon: '📐' },
        { id: 'hsc-4', title: 'Chemistry', icon: '🧪' },
        { id: 'hsc-5', title: 'Physics', icon: '⚛️' },
        { id: 'hsc-6', title: 'Biology', icon: '🧬' },
        { id: 'hsc-7', title: 'ICT', icon: '💻' },
        { id: 'hsc-8', title: 'GK', icon: '🌍' }
    ],
    admissionItems: [
        { id: 'adm-1', title: 'Varsity', icon: '🎓' },
        { id: 'adm-2', title: 'Medical', icon: '🏥' },
        { id: 'adm-3', title: 'Engineer', icon: '⚙️' }
    ],
    exploreCategories: [
        { id: 'cat-1', title: 'Science', icon: '🧬', desc: 'Physics, Chemistry, Math, Biology' },
        { id: 'cat-2', title: 'Commerce', icon: '💼', desc: 'Accounting, Finance, Management' },
        { id: 'cat-3', title: 'Arts', icon: '🎨', desc: 'History, Economics, Logic' },
        { id: 'cat-4', title: 'Engineering', icon: '⚙️', desc: 'BUET, KUET, RUET, CUET' },
        { id: 'cat-5', title: 'Medical', icon: '🏥', desc: 'DMC, SSMC, ShSMC' },
        { id: 'cat-6', title: 'University', icon: '🎓', desc: 'DU, JU, RU, CU' }
    ],
    exploreContent: [
        { id: 'exp-1', type: 'video', title: 'HSC Math Chapter 1', desc: 'Complete breakdown of Matrices' },
        { id: 'exp-2', type: 'pdf', title: 'Physics Formula Sheet', desc: 'All formulas in one place' },
        { id: 'exp-3', type: 'info', title: 'Exam Date Update', desc: 'Latest news from the education board' }
    ],
    users: [
        {
            id: 'u-1',
            name: 'Maruf Raihan',
            email: 'admin@gmail.com',
            password: 'admin',
            role: 'admin',
            phone: '+8801700000000',
            avatar: 'https://ui-avatars.com/api/?name=Maruf+Raihan&background=00f5ff&color=000'
        },
        {
            id: 'u-2',
            name: 'Student User',
            email: 'student@gmail.com',
            password: '123',
            role: 'student',
            phone: '+8801900000000',
            avatar: 'https://ui-avatars.com/api/?name=Student+User&background=random'
        }
    ]
};

function initData() {
    if (!localStorage.getItem('sikkhagrontho_data')) {
        localStorage.setItem('sikkhagrontho_data', JSON.stringify(defaultData));
    }
}

function getData() {
    initData();
    return JSON.parse(localStorage.getItem('sikkhagrontho_data'));
}

function saveData(data) {
    localStorage.setItem('sikkhagrontho_data', JSON.stringify(data));
    // Dispatch event to update views if needed
    window.dispatchEvent(new Event('dataUpdated'));
}
