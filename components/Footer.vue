<template>
  <footer class="reveal-on-scroll bg-graphite pt-20 pb-10 mt-16 rounded-t-[40px] px-6 md:px-16 overflow-hidden">
    <div class="max-w-content mx-auto relative z-10">
      
      <!-- Top Section: Logo & Description + Links -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 border-b border-white/10 pb-16">
        
        <!-- Left: Branding -->
        <div class="lg:col-span-4">
          <div class="mb-6">
            <img src="/logo.png" alt="KO.SWAP Logo" class="h-10" />
          </div>
          <p class="font-sans text-white/70 text-sm leading-relaxed max-w-sm mb-8">
            The fastest way to swap between crypto and Naira — directly to your bank account. Built for Africa, connected to the world.
          </p>
          
          <!-- Socials -->
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-volt hover:text-white transition-colors" aria-label="Twitter">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-volt hover:text-white transition-colors" aria-label="Instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"/></svg>
            </a>
          </div>
        </div>

        <!-- Right: Link Columns -->
        <div class="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 class="font-sans font-bold text-white mb-4">Products</h4>
            <ul class="space-y-3">
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">Instant Swap</a></li>
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">Pro Exchange</a></li>
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">OTC Desk</a></li>
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">API</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-sans font-bold text-white mb-4">Company</h4>
            <ul class="space-y-3">
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">About Us</a></li>
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">Careers</a></li>
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">Press</a></li>
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-sans font-bold text-white mb-4">Support</h4>
            <ul class="space-y-3">
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">Help Center</a></li>
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">Contact Us</a></li>
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">System Status</a></li>
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">Fees</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-sans font-bold text-white mb-4">Legal</h4>
            <ul class="space-y-3">
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">Terms of Service</a></li>
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="font-sans text-sm text-white/70 hover:text-volt transition-colors">AML/KYC Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-white/40 text-center md:text-left">
        <p>&copy; 2026 KO.SWAP Technologies. All rights reserved.</p>
        <p class="max-w-2xl">
          Disclaimer: Trading cryptocurrency involves significant risk. You should carefully consider whether trading or holding digital assets is suitable for you in light of your financial condition.
        </p>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer logic
</script>
