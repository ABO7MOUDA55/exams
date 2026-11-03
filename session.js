// منطق الدخول كله في الملف ده.
// الوضع الحالي: التحقق من قاعدة البيانات (students/{رقم الطالب}).
// لما تفعّل Firebase Authentication: بدّل جسم الدوال دي بس (login / currentStudentId / loadStudent / logout)
// وصفحتي login.html و panel.html مش هتحتاج تعديل. ونزّل قواعد database.rules.auth.json بدل القواعد الحالية.

import { db } from "./firebase-config.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const SESSION_KEY = "exams_student_id";

export class LoginError extends Error {
  constructor(code) {
    super(code);
    this.code = code; // "invalid-credentials" | "network"
  }
}

export function normalizeId(input) {
  return String(input)
    .trim()
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)); // يقبل الأرقام العربية
}

export async function login(idInput, password) {
  const id = normalizeId(idInput);

  // مفتاح RTDB ما ينفعش يحتوي . $ # [ ] / — ونقيّد الشكل عشان ما حدّش يجرّب مسارات تانية
  if (!/^[0-9A-Za-z_-]{1,64}$/.test(id) || !password) {
    throw new LoginError("invalid-credentials");
  }

  let student;
  try {
    student = (await get(ref(db, `students/${id}`))).val();
  } catch {
    throw new LoginError("network");
  }

  if (!student || typeof student.password !== "string" || student.password !== password) {
    // رسالة واحدة للحالتين عشان ما نكشفش هل الرقم موجود ولا لأ
    throw new LoginError("invalid-credentials");
  }

  try {
    sessionStorage.setItem(SESSION_KEY, id); // بنحفظ رقم الطالب بس، مش الباسورد
  } catch {
    throw new LoginError("network");
  }
  return id;
}

export function currentStudentId() {
  try {
    return sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

export async function loadStudent() {
  const id = currentStudentId();
  if (!id) return null;
  const snap = await get(ref(db, `students/${id}`));
  if (!snap.exists()) return null;
  const { password, ...student } = snap.val(); // الباسورد ما بنسيبوش في الذاكرة
  return { id, ...student };
}

export function logout() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}
