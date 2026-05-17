import { Mail, Phone, MapPin } from "lucide-react"
import ContactForm from "./contact-form"

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0">
        {/* Large atmospheric glows */}
        <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-gradient-radial from-[#8B5CF6]/30 via-[#EC4899]/15 to-transparent rounded-full blur-[100px] animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-radial from-[#06B6D4]/25 via-[#8B5CF6]/15 to-transparent rounded-full blur-[80px] animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-[#EC4899]/20 via-[#06B6D4]/10 to-transparent rounded-full blur-[60px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Additional smaller glows for depth */}
        <div
          className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-gradient-radial from-[#8B5CF6]/15 to-transparent rounded-full blur-[40px] animate-pulse-slow"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-[250px] h-[250px] bg-gradient-radial from-[#EC4899]/15 to-transparent rounded-full blur-[50px] animate-pulse-slow"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Floating gradient lines */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#8B5CF0] to-transparent animate-pulse shadow-lg shadow-[#8B5CF0]/50"></div>
        <div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#EC4899] to-transparent animate-pulse shadow-lg shadow-[#EC4899]/50"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#06B6D4] to-transparent animate-pulse shadow-lg shadow-[#06B6D4]/50"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute right-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#8B5CF6] to-transparent animate-pulse shadow-lg shadow-[#8B5CF6]/50"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 text-white">
            Get In{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Let's discuss your next project and bring your ideas to life
            I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                want to say hi, feel free to reach out!
          </p>
        </div>
        {/* Contact Form */}
        <div className="max-w-2xl mx-auto mt-12 sm:mt-14">
          <ContactForm />
        </div>

        {/* Contact Info */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-2 sm:space-y-2">
            <div>
              <p className="text-white/70 mb-8 sm:mb-10 leading-relaxed text-base sm:text-lg max-w-xl mx-auto">
                
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#4CC9F0]/20 to-[#4CC9F0]/10 border border-[#4CC9F0]/30">
                  <Mail className="h-6 w-6 text-[#4CC9F0]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white text-lg">Email</p>
                  <p className="text-white/80 text-base">aimanshahid800@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#06B6D4]/20 to-[#06B6D4]/10 border border-[#06B6D4]/30">
                  <MapPin className="h-6 w-6 text-[#06B6D4]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white text-lg">Location</p>
                  <p className="text-white/80 text-base">Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 sm:mt-20 pt-6 sm:pt-8 border-t border-[#8B5CF6]/30 text-center">
          <p className="text-white/70 text-sm sm:text-base">
            © 2024 aimiTECH. Built with passion and modern technologies.
          </p>
        </div>
      </div>
    </section>
  )
}
