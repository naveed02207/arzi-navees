import React from "react";
import {
  X,
  BookOpen,
  ShieldCheck,
  Scale,
  AlertTriangle,
  FileText,
} from "lucide-react";
interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm no-print overflow-y-auto">
      {" "}
      <div className="bg-white border border-black/10 rounded-xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl my-8 relative text-[#1C1C1C]">
        {" "}
        {/* Header */}{" "}
        <div className="flex items-center justify-between pb-4 border-b border-black/10">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            <BookOpen className="w-5 h-5 text-[#8B735B]" />{" "}
            <h2 className="text-base sm:text-lg font-bold font-urdu text-[#1C1C1C]">
              {" "}
              پاکستان میں سرکاری درخواستی عمل اور شہری حقوق کی رہنمائی{" "}
            </h2>{" "}
          </div>{" "}
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-stone-100 text-stone-500 hover:text-[#1C1C1C]"
          >
            {" "}
            <X className="w-5 h-5" />{" "}
          </button>{" "}
        </div>{" "}
        {/* Content */}{" "}
        <div className="py-4 space-y-4 text-xs sm:text-sm font-urdu leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
          {" "}
          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-black/10">
            {" "}
            <h3 className="font-bold text-[#8B735B] mb-1 flex items-center gap-1.5">
              {" "}
              <ShieldCheck className="w-4 h-4 text-[#8B735B]" />{" "}
              <span>
                ۱. پولیس تھانے میں درخواست و روزنامچہ (Roznamcha)
              </span>{" "}
            </h3>{" "}
            <p className="text-[#1C1C1C]/80 text-xs mt-1">
              {" "}
              اگر پولیس ایف آئی آر (FIR) درج کرنے میں ٹال مٹول کرے، تو ہمیشہ
              درخواست کی دو کاپیاں ہمراہ لے جائیں۔ ایک کاپی محرر (Front Desk
              Officer) کو جمع کروا کر دوسری کاپی پر مہر و ڈائری نمبر (Diary /
              Roznamcha Number) لازمی وصول کریں۔{" "}
            </p>{" "}
          </div>{" "}
          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-black/10">
            {" "}
            <h3 className="font-bold text-[#8B735B] mb-1 flex items-center gap-1.5">
              {" "}
              <Scale className="w-4 h-4 text-[#8B735B]" />{" "}
              <span>
                ۲. واپڈا و برقی اوور بلنگ کی شکایت (WAPDA / NEPRA)
              </span>{" "}
            </h3>{" "}
            <p className="text-[#1C1C1C]/80 text-xs mt-1">
              {" "}
              نیپرا کسٹمر پروٹیکشن رولز کے مطابق اوور بلنگ یا میٹر جلا ہونے کی
              صورت میں ایس ڈی او (SDO) کے دفتر میں تحریری درخواست جمع کروائیں۔
              اگر ۷ دن میں ازالہ نہ ہو تو وفاقی محتسب (Wafaqi Mohtasib) یا نيپرا
              ریجنل فورم سے رجوع کیا جا سکتا ہے۔{" "}
            </p>{" "}
          </div>{" "}
          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-black/10">
            {" "}
            <h3 className="font-bold text-[#8B735B] mb-1 flex items-center gap-1.5">
              {" "}
              <FileText className="w-4 h-4 text-[#8B735B]" />{" "}
              <span>۳. حقِ معلومات (Right to Information - RTI)</span>{" "}
            </h3>{" "}
            <p className="text-[#1C1C1C]/80 text-xs mt-1">
              {" "}
              آئینِ پاکستان کے آرٹیکل 19-A کے تحت ہر شہری کو تمام سرکاری محکموں
              کی کارروائی، بجٹ اور فائلوں کی معلومات کا قانونی حق حاصل ہے۔ تاخیر
              کی صورت میں صوبائی یا وفاقی انفارمیشن کمیشن کو درخواست دی جا سکتی
              ہے۔{" "}
            </p>{" "}
          </div>{" "}
          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-black/10">
            {" "}
            <h3 className="font-bold text-[#8B735B] mb-1 flex items-center gap-1.5">
              {" "}
              <AlertTriangle className="w-4 h-4 text-[#8B735B]" />{" "}
              <span>۴. وفاقی و صوبائی محتسب اعلیٰ (Ombudsman)</span>{" "}
            </h3>{" "}
            <p className="text-[#1C1C1C]/80 text-xs mt-1">
              {" "}
              سرکاری محکموں کی بدانتظامی، تاخیر، یا جائز حق مارنے کی صورت میں
              وفاقی محتسب (Mohtasib Office) کو مفت تحریری یا آن لائن شکایت جمع
              کروائی جا سکتی ہے جس کی کارروائی ۶۰ دنوں کے اندر مکمل کی جاتی
              ہے۔{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Footer */}{" "}
        <div className="pt-3 border-t border-black/10 flex justify-end">
          {" "}
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-[#8B735B] hover:bg-[#735F4B] text-white font-bold text-xs uppercase tracking-wider font-urdu shadow-sm"
          >
            {" "}
            سمجھ گئے (Close){" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
