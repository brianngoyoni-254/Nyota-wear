function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Contact Us</h1>

      <p className="text-zinc-400">
        Have questions or need support? Reach out to us anytime.
      </p>

      <div className="space-y-3 text-zinc-300">
        <p>Email: support@nyotawear.com</p>
        <p>Phone: +254 700 000 000</p>
        <p>Location: Nairobi, Kenya</p>
      </div>

      <form className="space-y-4 mt-6">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 bg-zinc-900 rounded-lg border border-zinc-700"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 bg-zinc-900 rounded-lg border border-zinc-700"
        />

        <textarea
          placeholder="Your Message"
          rows="5"
          className="w-full p-3 bg-zinc-900 rounded-lg border border-zinc-700"
        />

        <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;