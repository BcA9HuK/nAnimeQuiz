const SettingsManager = {
    showEditNameDialog() {
        const modal = document.getElementById('editNameModal');
        const input = document.getElementById('newUsername');
        input.value = UserManager.getUsername();
        modal.style.display = 'block';
        input.focus();
    },

    showResetConfirmDialog() {
        const modal = document.getElementById('confirmResetModal');
        modal.style.display = 'block';
    },

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    },

    saveName() {
        const input = document.getElementById('newUsername');
        const newName = input.value.trim();
        
        if (newName && newName.length <= 20) {
            UserManager.setUsername(newName);
            this.closeModal('editNameModal');
        } else {
            alert('Имя должно содержать от 1 до 20 символов');
        }
    },

    resetData() {
        UserManager.clearAllData();
        this.closeModal('confirmResetModal');
        window.location.reload();
    },

    showEditStatusDialog() {
        const modal = document.getElementById('editStatusModal');
        const input = document.getElementById('newStatus');
        input.value = UserManager.getStatus();
        modal.style.display = 'block';
        input.focus();
    },

    saveStatus() {
        const input = document.getElementById('newStatus');
        const newStatus = input.value.trim();
        
        if (newStatus.length <= 50) {
            UserManager.setStatus(newStatus);
            this.closeModal('editStatusModal');
        } else {
            alert('Статус не может быть длиннее 50 символов');
        }
    },

    showEditAvatarDialog() {
        const modal = document.getElementById('editAvatarModal');
        const preview = document.getElementById('avatarPreview');
        const input = document.getElementById('avatarInput');
        const currentAvatar = UserManager.getAvatar();
        
        preview.src = currentAvatar || '../media/default-avatar.png';
        
        preview.onerror = function() {
            this.src = '../media/default-avatar.png';
        };
        
        input.addEventListener('change', this.handleAvatarUpload);
        
        modal.style.display = 'block';
    },

    handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('Файл слишком большой. Максимальный размер: 2MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    // Создаем canvas для изменения размера
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    const size = 200;
                    canvas.width = size;
                    canvas.height = size;
                    
                    const minDimension = Math.min(img.width, img.height);
                    const sx = (img.width - minDimension) / 2;
                    const sy = (img.height - minDimension) / 2;
                    
                    ctx.drawImage(img, sx, sy, minDimension, minDimension, 0, 0, size, size);
                    
                    const preview = document.getElementById('avatarPreview');
                    preview.src = canvas.toDataURL('image/jpeg', 0.8);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    },

    saveAvatar() {
        const preview = document.getElementById('avatarPreview');
        if (preview.src) {
            UserManager.setAvatar(preview.src);
            this.closeModal('editAvatarModal');
            
            const profileAvatar = document.querySelector('.avatar img');
            if (profileAvatar) {
                profileAvatar.src = preview.src;
            }
        }
    },

    getAvailableStorageSpace() {
        let total = 0;
        try {
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    total += localStorage[key].length * 2;
                }
            }
            
            const maxSize = 5 * 1024 * 1024;
            return maxSize - total;
        } catch (e) {
            console.error('Error calculating storage space:', e);
            return 0;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация других компонентов...
}); 