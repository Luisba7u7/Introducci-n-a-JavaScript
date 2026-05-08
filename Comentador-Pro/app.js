//Variables
const APP_NAME = "Comments app";

const STORAGE = "comment-app:comments";

const THEME_KEY = 'mural-theme';

const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png';


const state = {
    comments: loadComments(),

}

const elements = {

    feedEl: document.getElementById('feed'),
    avatarPreview: document.getElementById('avatar-preview'),
    nameInput: document.getElementById('input-name'),
    commentInput: document.getElementById('input-comment'),
    fileInput: document.getElementById('file-input'),
    charCountEl: document.getElementById('char-count'),
    fileLabelEl: document.getElementById('file-label'),
    postCountEl: document.getElementById('post-count'),
    themeIcon: document.getElementById('theme-icon'),
    themeLabel: document.getElementById('theme-label'),

    //Eventos
    publishBtn: document.getElementById('publish-btn'),
    themeBtn: document.getElementById('theme-btn'),
    
}

function init(){
    bindEvents();
    render();

    console.log(`Bienvenido a ${APP_NAME}`);
}


function bindEvents(){
    elements.publishBtn.addEventListener("click", handlePostSubmit);
    
    elements.themeBtn.addEventListener("click", toggleTheme);

    elements.fileInput.addEventListener("change", handleFileChange);

    elements.commentInput.addEventListener("input", onCommentInput);

    document.addEventListener('keydown', (e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handlePostSubmit();
    });
    
}

function loadComments(){
    try{
        const storeComments = localStorage.getItem(STORAGE);

        if(!storeComments){
            return [];
        }
        return JSON.parse(storeComments)
    }catch(error){
        console.error("No pudieron cargar los habitos:", error);
        return [];
    }
}

function saveComments(){
    localStorage.setItem(STORAGE, JSON.stringify(state.comments));
}

function handlePostSubmit(){
    

    const name = elements.nameInput.value.trim();
    const comment = elements.commentInput.value.trim();

    console.log(name);

    if(!name || !comment){
        showNotification(messages.messageRequired, colorMessages.messageRequired)
        return;
    }

    const newPost = createPost({
        name,
        comment,
        avatar: state.pendingAvatar || DEFAULT_AVATAR
    });
    

    state.comments.unshift(newPost);

    saveComments();
    render();
    resetPost();
    
}


function toggleTheme(){
    const isDark = document.documentElement.classList.toggle('dark');
    applyThemeUI(isDark);
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

function applyThemeUI(isDark){
    themeIcon.src = isDark
     ? 'https://api.iconify.design/ph/sun.svg'
     : 'https://api.iconify.design/ph/moon.svg';
    themeIcon.alt      = isDark ? 'sol' : 'luna';
    themeLabel.textContent = isDark ? 'Claro' : 'Oscuro';
}

function initTheme() {
    if (localStorage.getItem(MuralApp.THEME_KEY) === 'dark') {
        document.documentElement.classList.add('dark');
        applyThemeUI(true);
    }
}

function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        state.pendingAvatar = event.target.result;
        elements.avatarPreview.src = state.pendingAvatar;

        elements.fileLabelEl.textContent =
            file.name.length > 20
                ? file.name.slice(0, 20) + "…"
                : file.name;
    };

    reader.readAsDataURL(file);
}

function onCommentInput() {
    elements.charCountEl.textContent = elements.commentInput.value.length;
}


function createPost({ name, comment, avatar }) {
    showNotification(messages.postSuccess, colorMessages.postSuccess);
    
    return {
        id: Date.now().toString(),
        name,
        comment,
        avatar,
        createdAt: new Date().toISOString(),
    };

    
}

function render() {
    renderPosts();
    updatePostCount();
}

function renderPosts() {
    elements.feedEl.innerHTML = "";

    if (state.comments.length === 0) {
        renderEmptyState();
        return;
    }

    state.comments.forEach(post => {
        const card = createCard(post);
        elements.feedEl.appendChild(card);
    });

    
}

function createCard({ id, name, comment, avatar, createdAt }) {
    const card = document.createElement('article');
    card.id = id;
    card.className = 'bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-2xl p-5 transition-colors duration-300';
    card.style.animation = 'fadeSlide 0.35s ease forwards';

    // Avatar
    const img = document.createElement('img');
    img.src = avatar;
    img.alt = escapeHTML(name);
    img.className = 'w-11 h-11 rounded-full object-cover border-2 border-stone-200 dark:border-zinc-600 shrink-0 mt-0.5 bg-stone-100 dark:bg-zinc-700';

    // Nombre
    const nameEl = document.createElement('span');
    nameEl.className = 'text-sm font-medium';
    nameEl.textContent = name;

    // Timestamp
    const timeEl = document.createElement('span');
    timeEl.className = 'text-xs text-stone-400 dark:text-zinc-500';
    timeEl.textContent = formatDate(createdAt);

    // Botón eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'flex items-center gap-1.5 text-xs font-medium text-red-400 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 active:scale-95 transition-all';
    deleteBtn.addEventListener('click', () => deletePost(id));

    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'https://api.iconify.design/ph/trash.svg?color=%23f87171';
    deleteIcon.alt = 'eliminar';
    deleteIcon.className = 'w-3 h-3';

    deleteBtn.append(deleteIcon, 'Eliminar');

    // Texto del comentario
    const textEl = document.createElement('p');
    textEl.className = 'text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 break-words';
    textEl.innerHTML = formatText(comment);

    // Ensamblado
    const metaRow = document.createElement('div');
    metaRow.className = 'flex items-center justify-between gap-2 flex-wrap mb-1.5';

    const nameRow = document.createElement('div');
    nameRow.className = 'flex items-baseline gap-2';
    nameRow.append(nameEl, timeEl);

    metaRow.append(nameRow, deleteBtn);

    const content = document.createElement('div');
    content.className = 'flex-1 min-w-0';
    content.append(metaRow, textEl);

    const row = document.createElement('div');
    row.className = 'flex gap-3 items-start';
    row.append(img, content);

    card.appendChild(row);

    

    return card;
}



function updatePostCount() {
    elements.postCountEl.textContent =
        `${state.comments.length} publicación${state.comments.length !== 1 ? "es" : ""}`;
}

function escapeHTML(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function formatText(text) {
    return escapeHTML(text).replace(/\n/g, "<br>");
}

function formatDate(date) {
    const d = new Date(date);

    return d.toLocaleString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "short"
    });
}

function deletePost(id) {
    state.comments = state.comments.filter(comment => comment.id !== id);
    showNotification(messages.postDeleted, colorMessages.postDeleted);
    saveComments();
    render();
}

function renderEmptyState() {
        const wrapper = document.createElement('div');
        wrapper.id        = 'empty-msg';
        wrapper.className = 'text-center py-12 text-stone-300 dark:text-zinc-600';

        const icon = document.createElement('img');
        icon.src       = 'https://api.iconify.design/ph/chat-circle-dots.svg?color=%23d6d3d1';
        icon.alt       = 'sin publicaciones';
        icon.className = 'w-8 h-8 mx-auto mb-3 opacity-60';

        const line1 = document.createElement('p');
        line1.className   = 'text-sm';
        line1.textContent = 'Aún no hay publicaciones.';

        const line2 = document.createElement('p');
        line2.className   = 'text-sm';
        line2.textContent = '¡Sé el primero en escribir algo!';

        wrapper.append(icon, line1, line2);
        elements.feedEl.appendChild(wrapper);

}

function resetPost(){
    elements.nameInput.value = "";
    elements.commentInput.value = "";
    elements.fileInput.value = "";

    elements.charCountEl.textContent = "0";

    state.pendingAvatar = null;
    elements.avatarPreview.src = DEFAULT_AVATAR;
    elements.fileLabelEl.textContent = "Foto (opcional)";

}

function showNotification(message, backgroundColor) {
    Toastify({
        text: message,
        duration: 2000,
        gravity: "top",
        position: "center",
        style: { 
            background: backgroundColor,
            color: "#000"

        }
    }).showToast();
}

const messages = {
    postSuccess: "¡Publicación creada con éxito!",
    postDeleted: "Publicación eliminada",
    messageRequired: "Nombre y comentario son obligatorios"
}

const colorMessages = {
    postSuccess: "#10B981",
    postDeleted: "#EF4444",
    messageRequired: "#F59E0B"
}




console.log(colorMessages.postDeleted);

init();

