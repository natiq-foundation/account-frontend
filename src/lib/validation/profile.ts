export interface ProfileErrors {
    fullName?: string;
    Username?: string;
}

export function validateProfile(
    fullName: string,
    Username: string,
): ProfileErrors {
    const errors: ProfileErrors = {};

    // Full Name validation
    const cleanName = fullName.trim();

    if (!cleanName) {
        errors.fullName = "Full name is required";
    } else if (cleanName.length < 2) {
        errors.fullName = "Full name must be at least 2 characters";
    } else if (cleanName.length > 50) {
        errors.fullName = "Full name cannot exceed 50 characters";
    }

    // Username validation
    const cleanUsername = Username.trim();

    if (!cleanUsername) {
        errors.Username = "Username is required";
    } else if (cleanUsername.length < 3) {
        errors.Username = "Username must be at least 3 characters";
    } else if (cleanUsername.length > 20) {
        errors.Username = "Username cannot exceed 20 characters";
    } else if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(cleanUsername)) {
        errors.Username =
            "Username can only contain letters, numbers and underscore";
    }

    return errors;
}
