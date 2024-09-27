// src/placeholderAnimation.js

export function placeholderAnimation() {
    const phrases = [
      "Write your story here!!!",
      "Once upon a time...",
      "In a world far, far away...",
      "The adventure begins...",
      "This is a story of..."
    ];
  
    let currentPhraseIndex = 0;
    let isDeleting = false;
    let currentText = '';
    const textArea = document.querySelector('.textarea');
    const typingSpeed = 100;
    const deleteSpeed = 80;
    const delayBetweenPhrases = 2000;
  
    function typeEffect() {
      const fullText = phrases[currentPhraseIndex];
  
      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
      }
  
      if (textArea) {
        textArea.placeholder = currentText;
      }
  
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => {
          isDeleting = true;
          setTimeout(typeEffect, deleteSpeed);
        }, delayBetweenPhrases);
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, typingSpeed);
      } else {
        setTimeout(typeEffect, isDeleting ? deleteSpeed : typingSpeed);
      }
    }
  
    typeEffect();
  }
  