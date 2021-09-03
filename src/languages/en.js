/* eslint-disable max-len */
export default {
    common: {
        cancel: 'Cancel',
        yes: 'Yes',
        no: 'No',
        ok: 'OK',
        attachment: 'Attachment',
        to: 'To',
        optional: 'Optional',
        new: 'NEW',
        search: 'Search',
        next: 'Next',
        goBack: 'Go back',
        add: 'Add',
        resend: 'Resend',
        save: 'Save',
        saveChanges: 'Save changes',
        password: 'Password',
        profile: 'Profile',
        payments: 'Payments',
        preferences: 'Preferences',
        view: 'View',
        not: 'Not',
        signIn: 'Sign in',
        continue: 'Continue',
        firstName: 'First name',
        lastName: 'Last name',
        phoneNumber: 'Phone number',
        email: 'Email',
        and: 'and',
        details: 'Details',
        privacy: 'Privacy',
        privacyPolicy: 'Privacy policy',
        delete: 'Delete',
        deleted: 'deleted',
        contacts: 'Contacts',
        recents: 'Recents',
        close: 'Close',
        download: 'Download',
        pin: 'Pin',
        unPin: 'Unpin',
        back: 'Back',
        saveAndContinue: 'Save & continue',
        settings: 'Settings',
        termsOfService: 'Terms of service',
        people: 'People',
        invite: 'Invite',
        here: 'here',
        dob: 'Date of birth',
        ssnLast4: 'Last 4 digits of SSN',
        personalAddress: 'Personal address',
        companyAddress: 'Company address',
        noPO: '(PO boxes and mail drop addresses are NOT allowed)',
        city: 'City',
        state: 'State',
        zip: 'Zip code',
        isRequiredField: 'is a required field',
        whatThis: 'What\'s this?',
        iAcceptThe: 'I accept the ',
        passwordCannotBeBlank: 'Password cannot be blank',
        remove: 'Remove',
        admin: 'Admin',
        dateFormat: 'YYYY-MM-DD',
        send: 'Send',
        notifications: 'Notifications',
        na: 'N/A',
        noResultsFound: 'No results found',
        timePrefix: 'It\'s',
        conjunctionFor: 'for',
        todayAt: 'Today at',
        tomorrowAt: 'Tomorrow at',
        yesterdayAt: 'Yesterday at',
        conjunctionAt: 'at',
        genericErrorMessage: 'Oops... something went wrong and your request could not be completed. Please try again later.',
    },
    attachmentPicker: {
        cameraPermissionRequired: 'Camera permission required',
        expensifyDoesntHaveAccessToCamera: 'This app does not have access to your camera, please enable the permission and try again.',
        attachmentError: 'Attachment error',
        errorWhileSelectingAttachment: 'An error occurred while selecting an attachment, please try again',
        errorWhileSelectingCorruptedImage: 'An error occurred while selecting a corrupted attachment, please try another file',
        takePhoto: 'Take photo',
        chooseFromGallery: 'Choose from gallery',
        chooseDocument: 'Choose document',
        attachmentTooLarge: 'Attachment too large',
        sizeExceeded: 'Attachment size is larger than 50 MB limit.',
    },
    textInputFocusable: {
        noExtentionFoundForMimeType: 'No extension found for mime type',
        problemGettingImageYouPasted: 'There was a problem getting the image you pasted',
    },
    baseUpdateAppModal: {
        updateApp: 'Update app',
        updatePrompt: 'A new version of this app is available.\nUpdate now or restart the app at a later time to download the latest changes.',
    },
    iOUConfirmationList: {
        whoPaid: 'WHO PAID?',
        whoWasThere: 'WHO WAS THERE?',
        whatsItFor: 'What\'s it for?',
    },
    iOUCurrencySelection: {
        selectCurrency: 'Select a currency',
        allCurrencies: 'ALL CURRENCIES',
    },
    optionsSelector: {
        nameEmailOrPhoneNumber: 'Name, email, or phone number',
    },
    videoChatButtonAndMenu: {
        tooltip: 'Video chat',
        zoom: 'Zoom',
        googleMeet: 'Google Meet',
    },
    hello: 'Hello',
    phoneCountryCode: '1',
    welcomeText: {
        phrase1: 'Welcome to the New Expensify! Enter your phone number or email to continue.',
        phrase2: 'Money talks. And now that chat and payments are in one place, it\'s also easy.',
        phrase3: 'Your payments get to you as fast as you can get your point across.',
        phrase4: 'Welcome back to the New Expensify! Please enter your password.',
    },
    reportActionCompose: {
        addAction: 'Actions',
        sendAttachment: 'Send attachment',
        addAttachment: 'Add attachment',
        writeSomething: 'Write something...',
        blockedFromConcierge: 'Communication is barred',
        youAppearToBeOffline: 'You appear to be offline.',
        fileUploadFailed: 'Upload failed. File is not supported.',
        roomIsArchived: 'This chat room has been deleted',
        localTime: ({user, time}) => `It's ${time} for ${user}`,
        edited: '(edited)',
        emoji: 'Emoji',
    },
    reportActionContextMenu: {
        copyToClipboard: 'Copy to clipboard',
        copied: 'Copied!',
        copyLink: 'Copy link',
        copyURLToClipboard: 'Copy URL to clipboard',
        markAsUnread: 'Mark as unread',
        editComment: 'Edit comment',
        deleteComment: 'Delete comment',
        deleteConfirmation: 'Are you sure you want to delete this comment?',
    },
    reportActionsView: {
        beFirstPersonToComment: 'Be the first person to comment',
    },
    reportActionsViewMarkerBadge: {
        newMsg: ({count}) => `${count} new message${count > 1 ? 's' : ''}`,
    },
    reportTypingIndicator: {
        isTyping: 'is typing...',
        areTyping: 'are typing...',
        multipleUsers: 'Multiple users',
    },
    sidebarScreen: {
        fabAction: 'New chat',
        newChat: 'New chat',
        newGroup: 'New group',
        headerChat: 'Chats',
        buttonSearch: 'Search',
        buttonMySettings: 'My settings',
        fabNewChat: 'New chat(Floating Action)',
    },
    iou: {
        amount: 'Amount',
        participants: 'Participants',
        confirm: 'Confirm',
        splitBill: 'Split bill',
        requestMoney: 'Request money',
        sendMoney: 'Send money',
        pay: 'Pay',
        viewDetails: 'View details',
        settleExpensify: 'Pay with Expensify',
        settleElsewhere: 'I\'ll settle up elsewhere',
        decline: 'Decline',
        settlePaypalMe: 'Pay with PayPal.me',
        settleVenmo: 'Pay with Venmo',
        request: ({amount}) => `Request ${amount}`,
        owes: ({manager, owner}) => `${manager} owes ${owner}`,
        paid: ({owner, manager}) => `${manager} paid ${owner}`,
        split: ({amount}) => `Split ${amount}`,
        send: ({amount}) => `Send ${amount}`,
        choosePaymentMethod: 'Choose payment method:',
        noReimbursableExpenses: 'This report has an invalid amount',
        error: {
            invalidAmount: 'Invalid amount',
            invalidSplit: 'Split amounts do not equal total amount',
            other: 'Unexpected error, please try again later',
        },
    },
    reportDetailsPage: {
        notificationPreferencesDescription: 'Notify me about new messages',
        always: 'Always',
        daily: 'Daily',
        mute: 'Mute',
        members: 'Members',
    },
    loginField: {
        addYourPhoneToSettleViaVenmo: 'Add your phone number to settle up via Venmo.',
        numberHasNotBeenValidated: 'The number has not yet been validated. Click the button to resend the validation link via text.',
        useYourPhoneToSettleViaVenmo: 'Use your phone number to settle up via Venmo.',
        emailHasNotBeenValidated: 'The email has not yet been validated. Click the button to resend the validation link via text.',
    },
    avatarWithImagePicker: {
        uploadPhoto: 'Upload photo',
        removePhoto: 'Remove photo',
        editImage: 'Edit photo',
    },
    profilePage: {
        profile: 'Profile',
        tellUsAboutYourself: 'Tell us about yourself, we would love to get to know you!',
        john: 'John',
        doe: 'Doe',
        preferredPronouns: 'Preferred pronouns',
        selectYourPronouns: 'Select your pronouns',
        selfSelectYourPronoun: 'Self-select your pronoun',
        emailAddress: 'Email address',
        setMyTimezoneAutomatically: 'Set my timezone automatically',
        timezone: 'Timezone',
        growlMessageOnSave: 'Your profile was successfully saved',
    },
    addSecondaryLoginPage: {
        addPhoneNumber: 'Add phone number',
        addEmailAddress: 'Add email address',
        enterPreferredPhoneNumberToSendValidationLink: 'Enter your preferred phone number and password to send a validation link.',
        enterPreferredEmailToSendValidationLink: 'Enter your preferred email address and password to send a validation link.',
        sendValidation: 'Send validation',
    },
    initialSettingsPage: {
        about: 'About',
        aboutPage: {
            description: 'The New Expensify App is built by a community of open source developers from around the world. Help us build the future of Expensify.',
            appDownloadLinks: 'App download links',
            viewTheCode: 'View the code',
            viewOpenJobs: 'View open jobs',
            reportABug: 'Report a bug',
        },
        appDownloadLinks: {
            android: {
                label: 'Android',
            },
            ios: {
                label: 'iOS',
            },
            desktop: {
                label: 'Desktop',
            },
        },
        signOut: 'Sign out',
        versionLetter: 'v',
        changePassword: 'Change password',
        readTheTermsAndPrivacyPolicy: {
            phrase1: 'Read the',
            phrase2: 'terms of service',
            phrase3: 'and',
            phrase4: 'privacy policy',
        },
    },
    passwordPage: {
        changePassword: 'Change password',
        changingYourPasswordPrompt: 'Changing your password will update your password for both your Expensify.com\nand New Expensify accounts.',
        currentPassword: 'Current password',
        newPassword: 'New password',
        newPasswordPrompt: 'New password must be different than your old password, have at least 8 characters,\n1 capital letter, 1 lowercase letter, 1 number.',
        confirmNewPassword: 'Confirm new password',
    },
    addPayPalMePage: {
        enterYourUsernameToGetPaidViaPayPal: 'Enter your username to get paid back via PayPal.',
        payPalMe: 'PayPal.me/',
        yourPayPalUsername: 'Your PayPal username',
        addPayPalAccount: 'Add PayPal account',
        editPayPalAccount: 'Update PayPal account',
        growlMessageOnSave: 'Your PayPal username was successfully added',
    },
    paymentsPage: {
        paymentMethodsTitle: 'Payment methods',
    },
    paymentMethodList: {
        addPaymentMethod: 'Add payment method',
        accountLastFour: 'Account ending in',
        cardLastFour: 'Card ending in',
        addFirstPaymentMethod: 'Add a payment method to send and receive payments directly in the app',
    },
    preferencesPage: {
        mostRecent: 'Most recent',
        mostRecentModeDescription: 'This will display all chats by default, sorted by most recent, with pinned items at the top.',
        focus: '#focus',
        focusModeDescription: '#focus – This will only display unread and pinned chats, all sorted alphabetically.',
        receiveRelevantFeatureUpdatesAndExpensifyNews: 'Receive relevant feature updates and Expensify news',
        priorityMode: 'Priority mode',
        language: 'Language',
        languages: {
            english: 'English',
            spanish: 'Spanish',
        },
    },
    signInPage: {
        expensifyDotCash: 'New Expensify',
        theCode: 'the code',
        openJobs: 'open jobs',
        heroHeading: 'Split bills\nand chat with friends.',
        heroDescription: {
            phrase1: 'Money talks. And now that chat and payments are in one place, it\'s also easy. Your payments get to you as fast as you can get your point across.',
            phrase2: 'The New Expensify is open source. View',
            phrase3: 'the code',
            phrase4: 'View',
            phrase5: 'open jobs',
        },
    },
    termsOfUse: {
        phrase1: 'By logging in, you agree to the',
        phrase2: 'terms of service',
        phrase3: 'and',
        phrase4: 'privacy policy',
        phrase5: 'Money transmission is provided by Expensify Payments LLC (NMLS',
        phrase6: 'ID:2017010) pursuant to its',
        phrase7: 'licenses',
    },
    passwordForm: {
        pleaseFillOutAllFields: 'Please fill out all fields',
        pleaseFillPassword: 'Please enter your password',
        pleaseFillTwoFactorAuth: 'Please enter your two factor code',
        enterYourTwoFactorAuthenticationCodeToContinue: 'Enter your two factor authentication code to continue',
        forgot: 'Forgot?',
        twoFactorCode: 'Two factor code',
        requiredWhen2FAEnabled: 'Required when 2FA is enabled',
        error: {
            incorrectLoginOrPassword: 'Incorrect login or password. Please try again.',
            twoFactorAuthenticationEnabled: 'You have 2FA enabled on this account. Please sign in using your email or phone number.',
            invalidLoginOrPassword: 'Invalid login or password. Please try again or reset your password.',
            unableToResetPassword: 'We were unable to change your password. This is likely due to an expired password reset link in an old password reset email. We have emailed you a new link so you can try again. Check your Inbox and your Spam folder; it should arrive in just a few minutes.',
            noAccess: 'You do not have access to this application. Please add your GitHub username for access.',
            accountLocked: 'Your account has been locked after too many unsuccessful attempts. Please try again after 1 hour.',
            fallback: 'Something went wrong. Please try again later.',
        },
    },
    loginForm: {
        pleaseEnterEmailOrPhoneNumber: 'Please enter an email or phone number',
        phoneOrEmail: 'Phone or email',
    },
    resendValidationForm: {
        linkHasBeenResent: 'Link has been re-sent',
        weSentYouMagicSignInLink: ({loginType}) => `We've sent a magic sign in link to your ${loginType}.`,
        resendLink: 'Resend link',
    },
    detailsPage: {
        localTime: 'Local time',
    },
    newGroupPage: {
        createGroup: 'Create group',
    },
    notFound: {
        chatYouLookingForCannotBeFound: 'The chat you are looking for cannot be found.',
        getMeOutOfHere: 'Get me out of here',
        iouReportNotFound: 'The payment details you are looking for cannot be found.',
    },
    setPasswordPage: {
        enterPassword: 'Enter a password',
        confirmNewPassword: 'Confirm the password',
        setPassword: 'Set password',
        passwordsDontMatch: 'Passwords must match',
        newPasswordPrompt: 'Your password must have at least 8 characters,\n1 capital letter, 1 lowercase letter, 1 number.',
        passwordFormTitle: 'Welcome back to the New Expensify! Please set your password.',
    },
    bankAccount: {
        accountNumber: 'Account number',
        routingNumber: 'Routing number',
        addBankAccount: 'Add bank account',
        chooseAnAccount: 'Choose an account',
        logIntoYourBank: 'Log into your bank',
        connectManually: 'Connect manually',
        yourDataIsSecure: 'Your data is secure',
        toGetStarted: 'To get started with the Expensify Card, you first need to add a bank account.',
        plaidBodyCopy: 'Give your employees an easier way to pay - and get paid back - for company expenses.',
        checkHelpLine: 'Your routing number and account number can be found on a check for the account.',
        hasPhoneLoginError: 'To add a verified bank account please ensure your primary login is a valid email and try again. You can add your phone number as a secondary login.',
        hasBeenThrottledError: ({fromNow}) => `For security reasons, we're taking a break from bank account setup so you can double-check your company information. Please try again ${fromNow}. Sorry!`,
        confirmModalTitle: 'Oops',
        confirmModalPrompt: 'Please double check any highlighted fields and try again.',
        confirmModalConfirmText: 'Got it',
        error: {
            noBankAccountAvailable: 'Sorry, no bank account is available',
            taxID: 'Please enter a valid Tax ID Number',
            website: 'Please enter a valid website',
            zipCode: 'Please enter a valid zip code',
            addressStreet: 'Please enter a valid address street that is not a PO Box',
            addressState: 'Please select a valid state',
            incorporationDate: 'Please enter a valid incorporation date',
            incorporationState: 'Please enter a valid Incorporation State',
            industryCode: 'Please enter a valid industry classification code. Must be 6 digits.',
            restrictedBusiness: 'Please confirm company is not on the list of restricted businesses',
            routingNumber: 'Please enter a valid Routing Number',
            companyType: 'Please enter a valid Company Type',
            tooManyAttempts: 'Due to a high number of login attempts, this option has been temporarily disabled for 24 hours. Please try again later or manually enter details instead.',
            address: 'Please enter a valid address',
            dob: 'Please enter a valid date of birth',
            ssnLast4: 'Please enter valid last 4 digits of SSN',
            noDefaultDepositAccountOrDebitCardAvailable: 'Please add a default deposit bank account or debit card',
            existingOwners: {
                unableToAddBankAccount: 'Unable to add bank account',
                alreadyInUse: 'This bank account is already in use by ',
                pleaseAskThemToShare: 'Please ask them to share it with you.',
                alternatively: 'Alternatively, you can ',
                setUpThisAccountByYourself: 'set up this account by yourself',
                validationProcessAgain: ' and go through the entire validation process again (may take up to a week).',
            },
        },
    },
    addPersonalBankAccountPage: {
        alreadyAdded: 'This account has already been added.',
        chooseAccountLabel: 'Account',
    },
    attachmentView: {
        unknownFilename: 'Unknown filename',
    },
    pronouns: {
        heHimHis: 'He/him',
        sheHerHers: 'She/her',
        theyThemTheirs: 'They/them',
        zeHirHirs: 'Ze/hir',
        selfSelect: 'Self-select',
        callMeByMyName: 'Call me by my name',
    },
    cameraPermissionsNotGranted: 'Camera permissions not granted',
    messages: {
        noPhoneNumber: 'Please enter a phone number including the country code e.g +447814266907',
        maxParticipantsReached: 'You\'ve reached the maximum number of participants for a group chat.',
    },
    onfidoStep: {
        acceptTerms: 'By continuing with the request to activate your Expensify wallet, you confirm that you have read, understand and accept ',
        facialScan: 'Onfido’s Facial Scan Policy and Release',
        tryAgain: 'Try again',
        verifyIdentity: 'Verify identity',
        genericError: 'There was an error while processing this step. Please try again.',
    },
    additionalDetailsStep: {
        headerTitle: 'Additional details',
        helpText: 'We need to confirm the following information before we can process this payment.',
        helpLink: 'Learn more about why we need this.',
        legalFirstNameLabel: 'Legal first name',
        legalMiddleNameLabel: 'Legal middle name',
        legalLastNameLabel: 'Legal last name',
    },
    termsStep: {
        headerTitle: 'Terms and fees',
        haveReadAndAgree: 'I have read and agree to receive ',
        electronicDisclosures: 'electronic disclosures',
        agreeToThe: 'I agree to the',
        walletAgreement: 'Wallet agreement',
        enablePayments: 'Enable payments',
        termsMustBeAccepted: 'Terms must be accepted',
        feeAmountZero: '$0',
        monthlyFee: 'Monthly fee',
        inactivity: 'Inactivity',
        electronicFundsInstantFee: '1.5%',
        electronicFundsInstantFeeMin: 'Min $0.25',
        noOverdraftOrCredit: 'No overdraft/credit feature.',
        electronicFundsWithdrawal: 'Electronic Funds Withdrawal',
        instant: 'Instant',
        standard: 'Standard',
        shortTermsForm: {
            expensifyPaymentsAccount: 'The Expensify Payments Account is issues by The Bancorp Bank.',
            perPurchase: 'Per purchase',
            atmWithdrawal: 'ATM withdrawal',
            cashReload: 'Cash reload',
            inNetwork: 'In-network',
            outOfNetwork: 'out-of-network',
            atmBalanceInquiry: 'ATM balance inquiry',
            inOrOutOfNetwork: 'In-network or out-of-network',
            customerService: 'Customer service',
            automatedOrLive: 'Automated or live agent',
            afterTwelveMonths: 'After 12 months with no transactions',
            weChargeOneFee: 'We charge 1 type of fee.',
            fdicInsurance: 'Your funds are eligible for FDIC insurance.',
            generalInfo: 'For general information about prepaid accounts, visit',
            conditionsDetails: 'Find details and conditions for all fees and services by visiting',
            conditionsPhone: 'or calling +1 833-400-0904.',
        },
        longTermsForm: {
            listOfAllFees: 'All Expensify Payments account fees:',
            typeOfFeeHeader: 'Type of fee',
            feeAmountHeader: 'Fee amount',
            moreDetailsHeader: 'More details',
            openingAccountTitle: 'Opening an account',
            openingAccountDetails: 'There is no fee to create an account.',
            monthlyFeeDetails: 'There is no monthly fee',
            customerServiceTitle: 'Customer service',
            customerServiceDetails: 'There are no customer service fees.',
            inactivityDetails: 'There is no inactivity fee.',
            sendingFundsTitle: 'Sending funds to another account holder',
            sendingFundsDetails: 'There is no fee to send funds to another account holder using your balance, '
                + 'bank account, or debit card.',
            electronicFundsStandardDetails: 'There is no fee to transfer funds from your Expensify Payments Account '
                + 'to your bank account using the standard option. This transfer usually completes within 1-3 business'
                + ' days.',
            electronicFundsInstantDetails: 'There is a fee to transfer funds from your Expensify Payments Account to '
                + 'your linked debit card using the instant transfer option. This transfer usually completes within'
                + 'several minutes. The fee is 1.5% of the transfer amount (with a minimum fee of $0.25).',
            fdicInsuranceBancorp: 'Your funds are eligible for FDIC insurance. Your funds will be held at or '
                + 'transferred to The Bancorp Bank, an FDIC-insured institution. Once there, your funds are insured up '
                + 'to $250,000 by the FDIC in the event The Bancorp Bank fails. See',
            fdicInsuranceBancorp2: 'for details.',
            contactExpensifyPayments: 'Contact Expensify Payments by calling +1 833-400-0904, by email at',
            contactExpensifyPayments2: 'or sign in at',
            generalInformation: 'For general information about prepaid accounts, visit',
            generalInformation2: 'If you have a complaint about a prepaid account, call the Consumer Financial '
                + 'Protection Bureau at 1-855-411-2372 or visit',
            printerFriendlyView: 'View printer-friendly version',
            automated: 'Automated',
            liveAgent: 'Live Agent',
        },
    },
    activateStep: {
        headerTitle: 'Enable payments',
        activated: 'Your Expensify Wallet is ready to use.',
        checkBackLater: 'We\'re still reviewing your information. Please check back later.',
    },
    companyStep: {
        headerTitle: 'Company information',
        subtitle: 'Provide more information about your company.',
        legalBusinessName: 'Legal business name',
        companyWebsite: 'Company website',
        taxIDNumber: 'Tax ID number',
        companyType: 'Company type',
        incorporationDate: 'Incorporation date',
        industryClassificationCode: 'Industry classification code',
        confirmCompanyIsNot: 'I confirm that this company is not on the',
        listOfRestrictedBusinesses: 'list of restricted businesses',
        incorporationDatePlaceholder: 'Start date (yyyy-mm-dd)',
        companyPhonePlaceholder: '10 digits, no hyphens',
    },
    requestorStep: {
        headerTitle: 'Requestor information',
        financialRegulations: 'Financial regulation and bank rules require us to validate the identity of any individual setting up bank accounts on behalf of a company. ',
        learnMore: 'Learn more',
        isMyDataSafe: 'Is my data safe?',
        onFidoConditions: 'By continuing with the request to add this bank account, you confirm that you have read, understand and accept ',
        onFidoFacialScan: 'Onfido’s Facial Scan Policy and Release',
        isControllingOfficer: 'I am authorized to use my company bank account for business spend',
        isControllingOfficerError: 'You must be a controlling officer with authorization to operate the business bank account.',
    },
    validationStep: {
        headerTitle: 'Validate',
        buttonText: 'Finish setup',
        maxAttemptError: 'Validation for this bank account has been disabled due to too many incorrect attempts. Please contact us.',
        description: 'A day or two after you add your account to Expensify we send three (3) transactions to your account. They have a merchant line like "Expensify, Inc. Validation"',
        descriptionCTA: 'Please enter each transaction amount in the fields below. Example: 1.51',
        reviewingInfo: 'Thanks! We\'re reviewing your information, and will be in touch shortly. Please check your chat with Concierge ',
        forNextSteps: ' for next steps to finish setting up your bank account.',
    },
    beneficialOwnersStep: {
        beneficialOwners: 'Beneficial owners',
        additionalInformation: 'Additional information',
        checkAllThatApply: '(check all that apply, otherwise leave blank)',
        iOwnMoreThan25Percent: 'I own more than 25% of ',
        someoneOwnsMoreThan25Percent: 'Somebody else owns more than 25% of ',
        additionalOwner: 'Additional beneficial owner',
        removeOwner: 'Remove this beneficial owner',
        addAnotherIndividual: 'Add another individual who owns more than 25% of ',
        agreement: 'Agreement:',
        termsAndConditions: 'terms and conditions',
        certifyTrueAndAccurate: 'I certify that the information provided is true and accurate',
        error: {
            termsAndConditions: 'Must accept terms and conditions',
            certify: 'Must certify information is true and accurate',
        },
    },
    vbaLoadingAnimation: {
        oneMoment: 'One Moment',
        explanationLine: 'We’re taking a look at your information. You will be able to continue with next steps shortly.',
    },
    session: {
        offlineMessageRetry: 'Looks like you\'re offline. Please check your connection and try again.',
        offlineMessage: 'Looks like you\'re offline.',
    },
    workspace: {
        common: {
            card: 'Expensify Card',
            workspace: 'Workspace',
        },
        new: {
            newWorkspace: 'New workspace',
            getTheExpensifyCardAndMore: 'Get the Expensify Card and more',
            genericFailureMessage: 'An error occurred creating the workspace, please try again.',
        },
        people: {
            assignee: 'Assignee',
            genericFailureMessage: 'An error occurred removing a user from the workspace, please try again.',
            removeMembersPrompt: 'Are you sure you want to remove the selected people from your workspace?',
            removeMembersTitle: 'Remove members',
        },
        card: {
            addEmail: 'Add email',
            tagline: 'The smartest corporate card in the room.',
            publicCopy: 'In order to use the Expensify Card you must use your company\'s private domain. Go ahead and add your private email address as a secondary login.',
            privateCopy: 'Just swipe your Expensify card and your expenses are done, its that simple!',
            getStarted: 'Get started',
            finishSetup: 'Finish setup',
            manageCards: 'Manage cards',
            cardReadyTagline: 'Your Expensify Cards are ready to go!',
        },
        invite: {
            invitePeople: 'Invite people',
            invitePeoplePrompt: 'Invite colleagues to your workspace.',
            personalMessagePrompt: 'Add a personal message (optional)',
            enterEmailOrPhone: 'Emails or phone numbers',
            EmailOrPhonePlaceholder: 'Enter comma-separated list of emails or phone numbers',
            pleaseEnterValidLogin: 'Please ensure the email or phone number is valid (e.g. +15005550006).',
            pleaseEnterUniqueLogin: 'That user is already a member of this workspace.',
            genericFailureMessage: 'An error occurred inviting the user to the workspace, please try again.',
            systemUserError: ({email}) => `Sorry, you cannot invite ${email} to a workspace.`,
            welcomeNote: ({workspaceName}) => `You have been invited to the ${workspaceName} workspace! Download the Expensify mobile app to start tracking your expenses.`,
        },
        editor: {
            title: 'Edit workspace',
            nameInputLabel: 'Name',
            nameInputHelpText: 'This is the name you will see on your workspace.',
            save: 'Save',
            genericFailureMessage: 'An error occurred updating the workspace, please try again.',
            avatarUploadFailureMessage: 'An error occurred uploading the avatar, please try again.',
        },
        error: {
            growlMessageInvalidPolicy: 'Invalid workspace!',
        },
    },
    requestCallPage: {
        requestACall: 'Request a call',
        description: 'Need help with your account configuration? Our team of guides are on hand to help you each step of the way.',
        instructions: 'Type in your name and phone number, and we’ll give you a call back.',
        availabilityText: '*Our guides are available from Sunday at 5pm CT to Friday at 5pm CT. Any requests outside this window will be returned 9am - 5pm, Monday - Friday in your local time. Call time is based on the order the call was received.',
        callMe: 'Call me',
        growlMessageOnSave: 'Call requested.',
        growlMessageInvalidPhone: 'That doesn’t look like a valid phone number. Try again with the country code.\ne.g. +15005550006',
        growlMessageEmptyName: 'Please provide both a first and last name so our guides know how to address you!',
        growlMessageNoPersonalPolicy: 'I wasn’t able to find a personal policy to associate this Guides call with, please check your connection and try again.',
        needHelp: 'Help',
        needHelpTooltip: 'Get live help from our team',
    },
};
