const Footer = () => {
  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 h-24 w-full bg-[#F6F8FA] p-4">
      <div className="text-[#A1A3A5] text-[0.875rem] font-light mb-2">
        © 2025 TALKIE. All rights reserved.
      </div>
      <div className="flex gap-5 text-[#A1A3A5] text-[0.75rem] font-light">
        <div>이용약관</div>
        <div>|</div>
        <div>개인정보 처리방침</div>
      </div>
    </div>
  );
};

export default Footer;
