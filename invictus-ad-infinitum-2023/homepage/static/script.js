const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const next_button = document.querySelector('.carousel-button-right');
const prev_button = document.querySelector('.carousel-button-left');
const dots_nav = document.querySelector('.carousel-nav');
const dots = Array.from(dots_nav.children);

const slide_width = slides[0].getBoundingClientRect().width;

// Arrange the slides next to each other.

const set_slide_position = (slide, index) => {
    slide.style.left = slide_width * index + "px";
};

slides.forEach(set_slide_position);

const move_to_slide = (track, current_slide, target_slide) => {
    track.style.transform = 'translateX(-' + target_slide.style.left + ')';
    current_slide.classList.remove('current-slide');
    target_slide.classList.add('current-slide');
}

const update_dots = (current_dot, target_dot) => {
    current_dot.classList.remove('current-slide');
    target_dot.classList.add('current-slide');
}

const hide_show_buttons = (target_index, slides, prev_button, next_button) => {
        if (target_index === 0)
    {
        prev_button.classList.add('is-hidden');
        next_button.classList.remove('is-hidden');
    }
    else if (target_index === slides.length - 1)
    {
        prev_button.classList.remove('is-hidden');
        next_button.classList.add('is-hidden');
    }
    else {
        prev_button.classList.remove('is-hidden');
        next_button.classList.remove('is-hidden');
    }
}

// When I click left, move slides to the left
prev_button.addEventListener('click', e => {
    const current_slide = track.querySelector('.current-slide');
    const prev_slide = current_slide.previousElementSibling;
    const current_dot = dots_nav.querySelector('.current-slide');
    const prev_dot = current_dot.previousElementSibling;
    const prev_index = slides.findIndex(slide => slide === prev_slide);

    move_to_slide(track, current_slide, prev_slide);
    update_dots(current_dot, prev_dot);
    hide_show_buttons(prev_index, slides, prev_button, next_button);
});

// When I click right, move slides to the right
next_button.addEventListener('click', e => {
    const current_slide = track.querySelector('.current-slide');
    const next_slide = current_slide.nextElementSibling;
    const current_dot = dots_nav.querySelector('.current-slide');
    const next_dot = current_dot.nextElementSibling;
    const next_index = slides.findIndex(slide => slide === next_slide);

    move_to_slide(track, current_slide, next_slide);
    update_dots(current_dot, next_dot);
    hide_show_buttons(next_index, slides, prev_button, next_button);
});

dots_nav.addEventListener('click', e => {
    const target_dot = e.target.closest('button');

    if (!target_dot) return;

    const current_slide = track.querySelector('.current-slide');
    const current_dot = dots_nav.querySelector('.current-slide');
    const target_index  = dots.findIndex(dot => dot === target_dot);
    const target_slide = slides[target_index];

    move_to_slide(track, current_slide, target_slide);
    update_dots(current_dot, target_dot);
    hide_show_buttons(target_index, slides, prev_button, next_button);
});