import { getDictionary } from "@/lib/i18n";
import HomeExperience from "@/features/home/HomeExperience";

export default function Home() {
  const dictionary = getDictionary("en");

  return (
    <main className="relative min-h-screen bg-background">
      <HomeExperience dictionary={dictionary} locale="en" />
    </main>
  );
}
