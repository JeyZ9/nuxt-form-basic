export const useFormRules = () => {
    return {
        ruleRequired: (v) => v.length > 0 ? true : false,
        ruleEmail: (v) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(v) || 'Invalid e-mail.';
        },
        rulePassLen: (v) => v.length >= 6 ? true : false,
    };
};
