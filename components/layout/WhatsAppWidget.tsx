import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/447988720640"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
