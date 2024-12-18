function goBack() {
    // Get the referrer URL to ensure the previous page is accessible
    const previousPage = document.referrer;

    if (previousPage) {
        // Attempt to reset forms on the referrer page
        window.location.href = previousPage;

        // Add a slight delay to clear form data after returning
        setTimeout(() => {
            const forms = document.querySelectorAll("form");
            forms.forEach((form) => form.reset());
        }, 50);
    } else {
        // Fallback to a default homepage or reload current page
        window.location.href = "/";
    }
}