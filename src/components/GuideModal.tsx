import React from "react";
import { X, BookOpen, ShieldCheck, Scale, AlertTriangle, FileText } from "lucide-react";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm no-print overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl my-8 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2 space-x-reverse">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-100 font-urdu">
              پاکستان میں سرکاری درخواستی عمل اور شہری حقوق کی رہنمائی
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4 text-xs sm:text-sm text-slate-300 font-urdu leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-400 mb-1 flex items-center space-x-1.5 space-x-reverse">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>۱. پولیس تھانے میں درخواست و روزنامچہ (Roznamcha)</span>
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              اگر پولیس ایف آئی آر (FIR) درج کرنے میں ٹال مٹول کرے، تو ہمیشہ درخواست کی دو کاپیاں ہمراہ لے جائیں۔ ایک کاپی محرر (Front Desk Officer) کو جمع کروا کر دوسری کاپی پر مہر و ڈائری نمبر (Diary / Roznamcha Number) لازمی وصول کریں۔
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-amber-400 mb-1 flex items-center space-x-1.5 space-x-reverse">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>۲. واپڈا و برقی اوور بلنگ کی شکایت (WAPDA / NEPRA)</span>
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              نیپرا کسٹمر پروٹیکشن رولز کے مطابق اوور بلنگ یا میٹر جلا ہونے کی صورت میں ایس ڈی او (SDO) کے دفتر میں تحریری درخواست جمع کروائیں۔ اگر ۷ دن میں ازالہ نہ ہو تو وفاقی محتسب (Wafaqi Mohtasib) یا نيپرا ریجنل فورم سے رجوع کیا جا سکتا ہے۔
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-blue-400 mb-1 flex items-center space-x-1.5 space-x-reverse">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>۳. حقِ معلومات (Right to Information - RTI)</span>
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              آئینِ پاکستان کے آرٹیکل 19-A کے تحت ہر شہری کو تمام سرکاری محکموں کی کارروائی، بجٹ اور فائلوں کی معلومات کا قانونی حق حاصل ہے۔ تاخیر کی صورت میں صوبائی یا وفاقی انفارمیشن کمیشن کو درخواست دی جا سکتی ہے۔
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-rose-400 mb-1 flex items-center space-x-1.5 space-x-reverse">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>۴. وفاقی و صوبائی محتسب اعلیٰ (Ombudsman)</span>
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              سرکاری محکموں کی بدانتظامی، تاخیر، یا جائز حق مارنے کی صورت میں وفاقی محتسب (Mohtasib Office) کو مفت تحریری یا آن لائن شکایت جمع کروائی جا سکتی ہے جس کی کارروائی ۶۰ دنوں کے اندر مکمل کی جاتی ہے۔
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs font-urdu"
          >
            سمجھ گئے (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
