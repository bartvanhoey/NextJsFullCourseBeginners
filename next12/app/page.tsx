import Posts from "./components/Posts";

export const revalidate = 10; //1 day = 86400 seconds;

export default function Home() {
  return (
    <main className="px-6 mx-auto">
      <p className="mt-12 mb-12 text-3xl text-center">
        Hello and Welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          I&apos;m <span className="font-bold">Bart</span>
        </span>
      </p>
      <Posts />
    </main>
  );
}
