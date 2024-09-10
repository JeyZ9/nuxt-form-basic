<template>
  <div class="container max-w-md mx-auto p-4 bg-white rounded-lg shadow-md d-flex flex-column align-items-center">
    <h1 class="text-xl font-bold mb-4 text-center">Registration Form</h1>
    <form @submit.prevent="submitForm" class="w-25 d-flex flex-column">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" v-model="name" placeholder="ex.wisarut" class="form-control" id="name" />
        <span v-if="nameError" class="text-danger small">{{ nameError }}</span>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" v-model="email" placeholder="ex.example@gmail.com" class="form-control" id="email" />
        <span v-if="emailError" class="text-danger small">{{ emailError }}</span>
      </div>

      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number</label>
        <input type="text" v-model="phone" maxlength="10" placeholder="ex.0123456789" class="form-control" id="phone" />
        <span v-if="phoneError" class="text-danger small">{{ phoneError }}</span>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <div class="d-flex align-items-center position-relative justify-content-end">
          <input :type="eyeChange ? 'text' : 'password'" v-model="password" placeholder="Password" class="form-control" id="password" />
            <button type="button" @click="eyeChange = !eyeChange" class="border-0 position-absolute btn d-flex align-items-center">
              <Icon v-if="eyeChange == true" name="mdi:eye" size="20" />
              <Icon v-else name="mdi:eye-off" size="20" />
            </button>
        </div>
        <span v-if="passwordError" class="text-danger small">{{ passwordError }}</span>
      </div>

      <div class="mb-3">
        <label for="conPass" class="form-label">Confirm Password</label>
        <div class="d-flex align-items-center position-relative justify-content-end">
          <input :type="eyeChangeCon ? 'text' : 'password'" v-model="conPass" placeholder="Confirm Password" class="form-control" id="conPass" />
          <button type="button" @click="eyeChangeCon = !eyeChangeCon" class="border-0 position-absolute btn d-flex align-items-center">
              <Icon v-if="eyeChangeCon == true" name="mdi:eye" size="20" />
              <Icon v-else name="mdi:eye-off" size="20" />
            </button>
        </div>
        <span v-if="conPassError" class="text-danger small">{{ conPassError }}</span>
      </div>

      <div class="mb-3">
        <label for="date" class="form-label">Date</label>
        <input type="date" v-model="date" class="form-control" id="date" />
        <span v-if="dateError" class="text-danger small">{{ dateError }}</span>
      </div>

      <div class="mb-3">
        <label for="country" class="form-label">Country</label>
        <input type="text" v-model="country" placeholder="Country" class="form-control" id="country" />
        <span v-if="countryError" class="text-danger small">{{ countryError }}</span>
      </div>

      <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input type="file" @change="handleImageUpload" class="form-control" id="image" />
        <div v-if="imagePreview" class="mt-2">
          <img :src="imagePreview" alt="Image Preview" class="img-thumbnail" />
        </div>
      </div>

      <div class="mb-3">
        <label for="captcha" class="form-label">CAPTCHA: {{ captcha }}</label>
        <input type="text" v-model="captchaInput" placeholder="Enter CAPTCHA" class="form-control" id="captcha" />
        <span v-if="captchaInputError" class="text-danger small">{{ captchaInputError }}</span>
      </div>

      <div class="form-check mb-3">
        <input type="checkbox" v-model="accept" class="form-check-input" id="accept" />
        <label class="form-check-label" for="accept">Accept the terms</label>
        <span v-if="!accept" class="text-danger small">You must accept the terms.</span>
      </div>

      <button type="submit" class="btn btn-primary w-100">Submit</button>
    </form>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { useFormRules } from './composables/useFormRules';

const { ruleRequired, ruleEmail, rulePassLen } = useFormRules();

const name = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const conPass = ref("");
const date = ref("");
const country = ref("");
const accept = ref(false);
const imagePreview = ref(null);
const captcha = ref("");
const captchaInput = ref("");

const eyeChange = ref(false);
const eyeChangeCon = ref(false);

const nameError = ref("");
const emailError = ref("");
const phoneError = ref("");
const passwordError = ref("");
const conPassError = ref("");
const dateError = ref("");
const countryError = ref("");
const captchaInputError = ref("");


const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file.');
        imagePreview.value = null; 
    }
};

const generateCaptcha = () => {
    captcha.value = Math.floor(1000 + Math.random() * 9000).toString();
};

onMounted(() => {
    generateCaptcha();
});

const submitForm = () => {
    nameError.value = "";
    emailError.value = "";
    phoneError.value = "";
    passwordError.value = "";
    conPassError.value = "";
    dateError.value = "";
    countryError.value = "";
    captchaInputError.value = "";

    let isValid = true;

    if (!ruleRequired(name.value)) {
        nameError.value = "Name is required.";
        isValid = false;
    }
    if (!ruleRequired(email.value)) {
        emailError.value = "Email is required.";
        isValid = false;
    } else if (!ruleEmail(email.value)) {
        emailError.value = "Invalid email format.";
        isValid = false;
    }
    if (!ruleRequired(phone.value)) {
        phoneError.value = "Phone number is required.";
        isValid = false;
    }
    if (!ruleRequired(password.value)) {
        passwordError.value = "Password is required.";
        isValid = false;
    } else if (!rulePassLen(password.value)) {
        passwordError.value = "Password must be at least 6 characters.";
        isValid = false;
    }
    if (!ruleRequired(conPass.value)) {
        conPassError.value = "Confirm password is required.";
        isValid = false;
    } else if (conPass.value !== password.value) {
        conPassError.value = "Passwords do not match.";
        isValid = false;
    }
    if (!ruleRequired(date.value)) {
        dateError.value = "Date is required.";
        isValid = false;
    }
    if (!ruleRequired(country.value)) {
        countryError.value = "Country is required.";
        isValid = false;
    }
    if (!accept.value) {
        isValid = false;
    }
    if (captchaInput.value !== captcha.value) {
        captchaInputError.value = "CAPTCHA is incorrect.";
        isValid = false;
    }

    if (isValid) {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Form submitted successfully!',
        });
        console.log("Form Submitted:");
        console.log("Name:", name.value);
        console.log("Email:", email.value);
        console.log("Phone:", phone.value);
        console.log("Password:", password.value);
        console.log("Country:", country.value);
        console.log("Terms Accepted:", accept.value);
        console.log("Image Preview:", imagePreview.value);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Please fill in all required fields correctly.',
        });
        console.error("Form validation failed.");
    }
}
</script>

<style scoped>
</style>
