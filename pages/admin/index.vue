<template>
  <div class="min-h-screen bg-[#FAF7F2] text-[#1C1B19] font-sans p-6 md:p-12" :class="{ 'flex flex-col justify-center': !isAuthenticated }">
    <div class="max-w-4xl mx-auto w-full">
      <div class="flex items-center gap-4 mb-12" :class="{ 'justify-center': !isAuthenticated }">
        <div class="bg-[#1C1B19] text-[#FAF7F2] font-bold w-12 h-12 rounded-xl flex items-center justify-center text-xl">
          KO
        </div>
        <h1 class="text-3xl font-bold font-display">KO.SWAP <span class="text-[#2A4BFF]">Admin</span></h1>
      </div>

      <!-- Login State -->
      <div v-if="!isAuthenticated" class="bg-white p-8 rounded-3xl shadow-sm border border-[#1C1B19]/5 max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-6 font-display">Admin Access</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block text-sm uppercase tracking-wide text-[#6B6A66] mb-2 font-medium">Password</label>
            <input 
              v-model="password" 
              type="password" 
              class="w-full h-14 px-5 rounded-2xl border border-[#6B6A66]/25 bg-white text-lg focus:outline-none focus:ring-2 focus:ring-[#2A4BFF]/30 focus:border-[#2A4BFF]"
              placeholder="Enter admin password"
            />
          </div>
          <p v-if="authError" class="text-red-500 text-sm mb-4">{{ authError }}</p>
          <button 
            type="submit" 
            class="w-full h-14 bg-[#2A4BFF] text-white rounded-2xl font-medium text-lg hover:bg-[#1A3BEF] transition-all focus:outline-none focus:ring-4 focus:ring-[#2A4BFF]/30"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Authenticating...' : 'Login' }}
          </button>
        </form>
      </div>

      <!-- Dashboard State -->
      <div v-else>
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
          <h2 class="text-2xl font-bold font-display">Waitlist Subscribers</h2>
          <div class="flex items-center gap-4">
            <div class="text-[#6B6A66] font-mono bg-white px-4 py-2 rounded-xl border border-[#1C1B19]/5 shadow-sm">
              Total: <span class="text-[#1C1B19] font-medium">{{ users.length }}</span>
            </div>
            <button @click="logout" class="text-sm font-medium text-[#1C1B19] bg-white border border-[#1C1B19]/10 hover:bg-gray-50 transition-colors px-4 py-2 rounded-xl shadow-sm">Logout</button>
          </div>
        </div>

        <div class="bg-white rounded-3xl border border-[#1C1B19]/5 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-[#1C1B19]/5 bg-gray-50/50">
                  <th class="px-6 py-4 text-xs font-medium uppercase tracking-wide text-[#6B6A66]">Email</th>
                  <th class="px-6 py-4 text-xs font-medium uppercase tracking-wide text-[#6B6A66]">Date Joined</th>
                  <th class="px-6 py-4 text-xs font-medium uppercase tracking-wide text-[#6B6A66]">Status</th>
                  <th class="px-6 py-4 text-xs font-medium uppercase tracking-wide text-[#6B6A66] text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#1C1B19]/5">
                <tr v-if="isFetching" class="animate-pulse">
                  <td colspan="4" class="px-6 py-8 text-center text-[#6B6A66]">Loading...</td>
                </tr>
                <tr v-else-if="users.length === 0">
                  <td colspan="4" class="px-6 py-8 text-center text-[#6B6A66]">No subscribers yet.</td>
                </tr>
                <tr v-else v-for="user in users" :key="user._id" class="hover:bg-gray-50/30 transition-colors">
                  <td class="px-6 py-4 font-medium text-[#1C1B19]">{{ user.email }}</td>
                  <td class="px-6 py-4 font-mono text-sm text-[#6B6A66]">{{ new Date(user.createdAt).toLocaleDateString() }}</td>
                  <td class="px-6 py-4">
                    <span v-if="user.replied" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#16A34A]/10 text-[#16A34A]">
                      Replied
                    </span>
                    <span v-else class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#FFC94A]/20 text-[#D97706]">
                      Waiting
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button 
                        @click="openReplyModal(user)"
                        class="text-sm font-medium text-[#2A4BFF] hover:text-[#1A3BEF] transition-colors bg-[#2A4BFF]/5 hover:bg-[#2A4BFF]/10 px-4 py-2 rounded-lg"
                      >
                        Reply
                      </button>
                      <button 
                        @click="deleteUser(user)"
                        class="text-sm font-medium text-[#DC2626] hover:text-[#B91C1C] transition-colors bg-[#DC2626]/5 hover:bg-[#DC2626]/10 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Reply Modal -->
    <div v-if="replyingTo" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1B19]/40 backdrop-blur-sm">
      <div class="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative">
        <button @click="closeReplyModal" class="absolute top-6 right-6 text-[#6B6A66] hover:text-[#1C1B19]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        
        <h3 class="text-2xl font-bold font-display mb-2">Reply to User</h3>
        <p class="text-[#6B6A66] mb-6">Send an email to <strong class="text-[#1C1B19] font-medium">{{ replyingTo.email }}</strong></p>
        
        <form @submit.prevent="sendReply">
          <div class="mb-6">
            <label class="block text-sm uppercase tracking-wide text-[#6B6A66] mb-2 font-medium">Message</label>
            <textarea 
              v-model="replyMessage"
              rows="6"
              class="w-full p-5 rounded-2xl border border-[#6B6A66]/25 bg-white text-[15px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#2A4BFF]/30 focus:border-[#2A4BFF] resize-none"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          
          <div class="flex items-center gap-3 justify-end">
            <button 
              type="button" 
              @click="closeReplyModal"
              class="px-6 py-3 rounded-xl font-medium text-[#6B6A66] hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-6 py-3 bg-[#2A4BFF] text-white rounded-xl font-medium hover:bg-[#1A3BEF] transition-all focus:outline-none focus:ring-4 focus:ring-[#2A4BFF]/30 disabled:opacity-50 flex items-center gap-2"
              :disabled="isSending"
            >
              <svg v-if="isSending" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSending ? 'Sending...' : 'Send Message' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isAuthenticated = ref(false)
const password = ref('')
const isLoading = ref(false)
const isFetching = ref(false)
const authError = ref('')
const users = ref([])

const replyingTo = ref(null)
const replyMessage = ref('')
const isSending = ref(false)

const login = async () => {
  isLoading.value = true
  authError.value = ''
  
  try {
    const res = await $fetch('/api/admin/auth', {
      method: 'POST',
      body: { password: password.value }
    })
    
    if (res.success) {
      isAuthenticated.value = true
      localStorage.setItem('admin_password', password.value)
      fetchUsers()
    }
  } catch (err) {
    authError.value = err.data?.statusMessage || 'Invalid password'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const savedPassword = localStorage.getItem('admin_password')
  if (savedPassword) {
    password.value = savedPassword
    fetchUsers()
  }
})

const logout = () => {
  isAuthenticated.value = false
  password.value = ''
  users.value = []
  localStorage.removeItem('admin_password')
}

const fetchUsers = async () => {
  isFetching.value = true
  try {
    const res = await $fetch('/api/admin/waitlist', {
      query: { password: password.value }
    })
    users.value = res.users || []
    isAuthenticated.value = true
  } catch (err) {
    console.error('Failed to fetch users', err)
    // If unauthorized here, reset auth state
    if (err.response?.status === 401) {
      isAuthenticated.value = false
      localStorage.removeItem('admin_password')
      password.value = ''
    }
  } finally {
    isFetching.value = false
  }
}

const openReplyModal = (user) => {
  replyingTo.value = user
  replyMessage.value = ''
}

const closeReplyModal = () => {
  replyingTo.value = null
  replyMessage.value = ''
}

const sendReply = async () => {
  if (!replyMessage.value.trim() || !replyingTo.value) return
  
  isSending.value = true
  try {
    await $fetch('/api/admin/reply', {
      method: 'POST',
      body: { 
        password: password.value,
        email: replyingTo.value.email,
        message: replyMessage.value
      }
    })
    
    // Update local state to show replied
    const userIndex = users.value.findIndex(u => u._id === replyingTo.value._id)
    if (userIndex !== -1) {
      users.value[userIndex].replied = true
    }
    
    closeReplyModal()
  } catch (err) {
    console.error('Failed to send reply', err)
    alert(err.data?.statusMessage || 'Failed to send reply. Please check console.')
  } finally {
    isSending.value = false
  }
}

const deleteUser = async (user) => {
  if (!confirm(`Are you sure you want to delete ${user.email} from the waitlist?`)) return
  
  try {
    await $fetch('/api/admin/waitlist', {
      method: 'DELETE',
      body: { 
        password: password.value,
        email: user.email
      }
    })
    
    // Update local state
    users.value = users.value.filter(u => u.email !== user.email)
  } catch (err) {
    console.error('Failed to delete user', err)
    alert(err.data?.statusMessage || 'Failed to delete user.')
  }
}
</script>

<style>
/* Basic font imports for the admin dashboard */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=general-sans@400,500&display=swap');

.font-display {
  font-family: 'Clash Display', sans-serif;
}
.font-sans {
  font-family: 'General Sans', sans-serif;
}
.font-mono {
  font-family: 'JetBrains Mono', monospace;
}
</style>
