function switchTab(tabId) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));

    document.querySelector(`.admin-tab[onclick="switchTab('${tabId}')"]`).classList.add('active');
    document.getElementById(`${tabId}-section`).classList.add('active');
}

function renderAdminList() {
    const data = getData();

    // HSC
    const hscContainer = document.getElementById('hsc-list');
    if (hscContainer) {
        hscContainer.innerHTML = '';
        data.hscSubjects.forEach((sub, index) => {
            hscContainer.innerHTML += `
                <div class="admin-item">
                    <span style="font-weight: 600; margin-right: 10px; color: var(--primary-color);">#${index + 1}</span>
                    <span style="font-size: 1.5em; margin-right: 15px;">${sub.icon}</span>
                    <span>${sub.title}</span>
                    <div class="item-actions">
                        <button class="delete" onclick="deleteItem('hsc', '${sub.id}')">Delete</button>
                    </div>
                </div>
            `;
        });
    }

    // Admission
    const admContainer = document.getElementById('admission-list');
    if (admContainer) {
        admContainer.innerHTML = '';
        data.admissionItems.forEach((adm, index) => {
            admContainer.innerHTML += `
                <div class="admin-item">
                    <span style="font-weight: 600; margin-right: 10px; color: var(--primary-color);">#${index + 1}</span>
                    <span style="font-size: 1.5em; margin-right: 15px;">${adm.icon}</span>
                    <span>${adm.title}</span>
                    <div class="item-actions">
                        <button class="delete" onclick="deleteItem('admission', '${adm.id}')">Delete</button>
                    </div>
                </div>
            `;
        });
    }

    // Explore
    const expContainer = document.getElementById('explore-list');
    if (expContainer) {
        expContainer.innerHTML = '';
        data.exploreContent.forEach((exp, index) => {
            expContainer.innerHTML += `
                <div class="admin-item">
                    <span style="font-weight: 600; margin-right: 10px; color: var(--primary-color);">#${index + 1}</span>
                    <span style="background: rgba(0, 245, 255, 0.1); color: var(--primary-color); padding: 5px 10px; border-radius: 5px; margin-right: 10px;">${exp.type}</span>
                    <div style="flex-grow: 1;">
                        <strong>${exp.title}</strong><br>
                        <small style="opacity: 0.7;">${exp.desc}</small>
                    </div>
                    <div class="item-actions">
                        <button class="delete" onclick="deleteItem('explore', '${exp.id}')">Delete</button>
                    </div>
                </div>
            `;
        });
    }

    // Users
    renderUsers();
}

function renderUsers() {
    const usersContainer = document.getElementById('users-list');
    if (!usersContainer) return;

    const data = getData();

    usersContainer.innerHTML = `
        <div style="overflow-x: auto;">
            <table class="users-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.users.map((user, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>
                                <img src="${user.avatar}" alt="${user.name}" 
                                     style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--primary-color);">
                            </td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td>
                                <span style="background: ${user.role === 'admin' ? '#ff4d4d' : 'rgba(0, 245, 255, 0.2)'}; 
                                             color: ${user.role === 'admin' ? '#fff' : 'var(--primary-color)'}; 
                                             padding: 5px 12px; border-radius: 15px; font-size: 0.85em; font-weight: 600;">
                                    ${user.role.toUpperCase()}
                                </span>
                            </td>
                            <td style="font-family: monospace; font-size: 0.85em; opacity: 0.7;">${user.id}</td>
                            <td>
                                ${user.role !== 'admin' ? `<button class="delete" onclick="deleteUser('${user.id}')">Delete</button>` : '<span style="opacity: 0.5;">Protected</span>'}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    let data = getData();
    data.users = data.users.filter(user => user.id !== userId);
    saveData(data);
    renderUsers();
    alert('User deleted successfully!');
}

function addItem(type) {
    const data = getData();
    const id = Date.now().toString();

    if (type === 'hsc') {
        const title = document.getElementById('hsc-title').value;
        const icon = document.getElementById('hsc-icon').value;
        if (!title || !icon) return alert('Please fill in all fields');

        data.hscSubjects.push({ id, title, icon });

        document.getElementById('hsc-title').value = '';
        document.getElementById('hsc-icon').value = '';
    }
    else if (type === 'admission') {
        const title = document.getElementById('adm-title').value;
        const icon = document.getElementById('adm-icon').value;
        if (!title || !icon) return alert('Please fill in all fields');

        data.admissionItems.push({ id, title, icon });

        document.getElementById('adm-title').value = '';
        document.getElementById('adm-icon').value = '';
    }
    else if (type === 'explore') {
        const typeSelect = document.getElementById('exp-type').value;
        const title = document.getElementById('exp-title').value;
        const desc = document.getElementById('exp-desc').value;
        if (!title || !desc) return alert('Please fill in all fields');

        data.exploreContent.push({ id, type: typeSelect, title, desc });

        document.getElementById('exp-title').value = '';
        document.getElementById('exp-desc').value = '';
    }

    saveData(data);
    renderAdminList();
    alert('Item added successfully!');
}

function deleteItem(type, id) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    let data = getData();

    if (type === 'hsc') {
        data.hscSubjects = data.hscSubjects.filter(item => item.id !== id);
    } else if (type === 'admission') {
        data.admissionItems = data.admissionItems.filter(item => item.id !== id);
    } else if (type === 'explore') {
        data.exploreContent = data.exploreContent.filter(item => item.id !== id);
    }

    saveData(data);
    renderAdminList();
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the admin page before rendering
    if (document.getElementById('hsc-list')) {
        renderAdminList();
    }
});
