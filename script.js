// 密码生成相关字符集
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{},.<>?/|';

function generatePassword(length, useUpper, useLower, useNum, useSym) {
  let chars = '';
  if (useUpper) chars += UPPERCASE;
  if (useLower) chars += LOWERCASE;
  if (useNum) chars += NUMBERS;
  if (useSym) chars += SYMBOLS;
  if (!chars) return '';
  let pwd = '';
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

function checkStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 16) score++;
  if (score <= 2) return {text: '弱', class: 'strength-weak'};
  if (score <= 4) return {text: '中', class: 'strength-medium'};
  return {text: '强', class: 'strength-strong'};
}

document.getElementById('generate').addEventListener('click', () => {
  const length = parseInt(document.getElementById('length').value, 10);
  const useUpper = document.getElementById('uppercase').checked;
  const useLower = document.getElementById('lowercase').checked;
  const useNum = document.getElementById('numbers').checked;
  const useSym = document.getElementById('symbols').checked;
  const pwd = generatePassword(length, useUpper, useLower, useNum, useSym);
  document.getElementById('password').value = pwd;
  const strength = checkStrength(pwd);
  const strengthText = document.getElementById('strength-text');
  strengthText.textContent = strength.text;
  strengthText.className = '';
  strengthText.classList.add(strength.class);
});

document.getElementById('copy').addEventListener('click', () => {
  const pwdInput = document.getElementById('password');
  if (!pwdInput.value) return;
  pwdInput.select();
  document.execCommand('copy');
  document.getElementById('copy').textContent = '已复制!';
  setTimeout(() => {
    document.getElementById('copy').textContent = '复制';
  }, 1200);
}); 