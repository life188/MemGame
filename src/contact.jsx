const ContactSection = () => {
  return (
    <section id="how-to-play" className="py-16 bg-blue-300 text-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">How to Play</h2>
        <div className="space-y-6 text-lg">
          <p>Welcome to WordHop</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Choose a category </li>
            <li>Pick a difficulty mode</li>
            <li>A word will appear to start the game</li>
            <li>
              Type a new word that starts with the last letter of the previous
              word
            </li>
            <li>Earn points for each correct word</li>
            <li>
              If you’re in Timed mode, each correct word gives you extra time
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
