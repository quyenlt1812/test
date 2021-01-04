import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Box from '../../components/Box';
import Header from '../../components/Header';
import Text, {TextWeight} from '../../components/Text';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.WHITE},
  facebook: {marginRight: 15},
});

const TermsAndPolicies = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header backable title="Terms & Policies" />
      <ScrollView>
        <Box p={15}>
          <Text weight={TextWeight.BOLD} mb={24}>
            What this policy covers
          </Text>
          <Text mb={24}>
            Your privacy is important to us, and so is being transparent about
            how we collect, use, and share information about you. This policy is
            intended to help you understand:
          </Text>
          <Text mb={24}>• What information we collect about you </Text>
          <Text mb={24}>• How we use the information we collect </Text>
          <Text mb={24}>• How we share the information we collect </Text>
          <Text mb={24}>
            • How we store and secure the information we collect{' '}
          </Text>
          <Text mb={24}>• How to access and control your information </Text>
          <Text mb={24}>• Other important privacy information </Text>
          <Text mb={24}>
            This Privacy Policy covers the information we collect about you when
            you use our products or services, or otherwise interact with
            Employee Experience Solution Pte. Ltd. (for example, attending
            Employee Experience Solution Pte. Ltd. events), unless a different
            privacy policy is displayed. This policy also explains your choices
            about how we use information about you. Your choices include how you
            can object to certain uses of information about you and how you can
            access and update certain information about you. If you do not agree
            with this policy, do not access or use our Services or interact with
            any other aspect of our business.
          </Text>
          <Text mb={24}>
            When we refer to "we," or "us" in this policy, we mean Employee
            Experience Solution Pte. Ltd. including our site admin and mobile
            and desktop products. We refer to all these products, together with
            our other services and websites as "Services" in this policy.
          </Text>
          <Text weight={TextWeight.BOLD} mb={24}>
            What information we collect about you{' '}
          </Text>
          <Text mb={24}>
            We collect information about you when you provide it to us, when you
            use our Services.
          </Text>
          <Text weight={TextWeight.SEMIBOLD}>
            INFORMATION YOU PROVIDE TO US
          </Text>
          <Text mb={24}>
            We collect information about you when you input it into the Services
            or otherwise provide it directly to us.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>
              Account and Profile Information:{' '}
            </Text>
            We collect information about you when you register your account on
            our services, when you create or modify your profile, set
            preferences, claim and redeem rewards through the Services. For
            example, you provide your contact information and other details
            required to create your profile to provide the Services. We keep
            track of your preferences when you select settings within the
            Services.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>
              Content you provide through our products:{' '}
            </Text>
            The Services include the Employee Experience Solution Pte. Ltd. site
            admin, mobile and desktop products you use, where we collect and
            store content that you send, receive and share. This content
            includes any information about you that you may choose to include.
            Content also includes the files and links you upload to the
            Services. Examples of content we collect and store include: text
            attached to recognitions, announcements, messages you send or
            receive, information provided in polls etc.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>
              Content you provide through our websites:{' '}
            </Text>
            The Services also include our site admins owned or operated by us.
            We collect other content that you submit to these websites. For
            example, you provide content to us when you provide feedback or when
            you participate in any interactive features, surveys, contests,
            promotions, sweepstakes, activities or events.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>
              Information you provide through our support channels:{' '}
            </Text>
            The Services also include customer support, where you may choose to
            submit information regarding a problem you are experiencing with a
            Service. Whether you designate yourself as a technical contact, open
            a support ticket, speak to one of our representatives directly or
            otherwise engage with our support team, you will be asked to provide
            contact information, a summary of the problem you are experiencing,
            and any other documentation, screenshots or information that would
            be helpful in resolving the issue.
          </Text>
          <Text weight={TextWeight.SEMIBOLD}>
            INFORMATION WE COLLECT AUTOMATICALLY WHEN YOU USE THE SERVICES
          </Text>
          <Text mb={24}>
            We collect information about you when you use our Services and
            taking certain actions within the Services.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>Your use of the Services: </Text>
            We keep track of certain information about you when you visit and
            interact with any of our Services. This information includes the
            features you use; the rewards or benefits you claim, redeem, share
            or place on the wish list, search terms; and how you interact with
            others on the Services. We also collect information about the teams
            and people you work with and how you interact with them, like who
            you collaborate with and communicate with most frequently.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>
              Device and Connection Information:{' '}
            </Text>
            We collect information about your phone, tablet, or other devices
            you use to access the Services. This device information includes
            your connection type and settings when you install, access, update,
            or use our Services. We also collect information through your device
            about your operating system, device identifiers and crash data. We
            use your IP address and/or country preference in order to
            approximate your location to provide you with a better Service
            experience. Cookies are used in order to improve the Services,
            including saving login information. How much of this information we
            collect depends on the type and settings of the device you use to
            access the Services.
          </Text>
          <Text weight={TextWeight.BOLD} mb={24}>
            How we use the information we collect
          </Text>
          <Text mb={24}>
            How we use the information we collect depends in part on which
            Services you use, how you use them, and any preferences you have
            communicated to us. Below are the specific purposes for which we use
            the information we collect about you.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>
              To provide the Services and personalize your experience:{' '}
            </Text>
            We use information about you to provide the Services to you,
            including to authenticate you when you log in, provide customer
            support, operate and maintain the Services, provide tailored
            recommendations. For example, we use the name and picture you
            provide in your account to identify you to other Service users.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>
              For research, development and feature improvement:{' '}
            </Text>
            We are always looking for ways to make our Services smarter, faster,
            secure, integrated and useful to you. We use collective learnings
            and conduct statistical analysis about how people use our Services
            and feedback provided directly to us to troubleshoot and to identify
            trends, usage, activity patterns and areas for integration
            improvement of the Services, and to provide more appropriate rewards
            and benefits. For example, we used information collected about how
            users “submit a proof” from within the product to design a better,
            more user-friendly “Activities”. In some cases, we apply these
            learnings across Employee Experience Solution Pte. Ltd. to improve
            and develop similar features or to better integrate the services you
            use.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>Customer support: </Text>
            We use your information to resolve technical issues you encounter,
            to respond to your requests for assistance, to analyze crash
            information, and to repair and improve the Services. Where you give
            us permission to do so, we share your information with an Employee
            Experience Solution Pte. Ltd. expert for the purpose of responding
            to support-related requests.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>For safety and security: </Text>
            We use information about you and your Service use to verify accounts
            and activity, to monitor suspicious or fraudulent activity and to
            identify violations of Service policies. To protect our legitimate
            business interests and legal rights: Where required by law or where
            we believe it is necessary to protect our legal rights, interests
            and the interests of others, we use information about you in
            connection with legal claims, compliance, regulatory, and audit
            functions, and disclosures in connection with the acquisition,
            merger or sale of a business.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>With your consent: </Text>
            We use information about you where you have given us consent to do
            for a specific purpose not listed above. For example, we may publish
            testimonials or featured customer stories to promote the Services,
            with your permission. If you have consented to our use of
            information about you for a specific purpose, you have the right to
            change your mind at any time, but this will not affect any
            processing that has already taken place. Where we are using your
            information because we or a third party (e.g. your employer) have a
            legitimate interest to do so, you have the right to object to that
            use though, in some cases, this may mean no longer using the
            Services.
          </Text>
          <Text weight={TextWeight.BOLD} mb={24}>
            How we share information we collect
          </Text>
          <Text weight={TextWeight.SEMIBOLD}>
            SHARING WITH OTHER SERVICE USERS
          </Text>
          <Text mb={24}>
            When you use the Services, we share certain information about you
            with other Service users.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>For collaboration: </Text>
            You can create content, which may contain information about you, and
            grant permission to others to see, share, copy and download that
            content. Some of the collaboration features of the Services display
            some or all of your profile information to other Service users when
            you share or interact with specific content.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>
              Managed accounts and administrators:{' '}
            </Text>
            If you register or access the Services using an email address with a
            domain that is owned by your employer or organization, or associate
            that email address with your existing account and such organization
            wishes to establish a Employee Experience Solution Pte. Ltd. certain
            information about you including your name, profile picture, contact
            info, content, and account use may become accessible to that
            organization’s administrator and Employee Experience Solution Pte.
            Ltd. service users, as permitted by your administrator, to provide
            you additional products and services. For example, your organization
            may request that we provide extra security controls around your
            account to protect information about your organization. If you are
            the administrator or manager of a team within the Services, we may
            share your contact information with current or past Service users,
            for the purpose of facilitating Service-related requests.
          </Text>
          <Text weight={TextWeight.SEMIBOLD}>SHARING WITH THIRD PARTIES</Text>
          <Text mb={24}>
            We share information with third parties that help us operate,
            provide, improve, integrate, customize, support and market our
            Services.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>Service Providers: </Text>
            We work with third-party service providers to provide website and
            application development, hosting, maintenance, backup, storage,
            virtual infrastructure, analysis and other services for us, which
            may require them to access or use information about you. If a
            service provider needs to access information about you to perform
            services on our behalf, they do so under instruction from us,
            including abiding by policies and procedures designed to protect
            your information.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>
              Reward & Benefit Partners:{' '}
            </Text>
            We work with third-party reward & benefit providers to provide
            rewards and benefits for the Services. Anonymised information may be
            shared with these partners in order to provide the most relevant and
            high quality benefits & rewards.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>With your consent: </Text>
            We share information about you with third parties when you give us
            consent to do so. For example, we often display personal
            testimonials of satisfied customers on our public websites. With
            your consent, we may post your name alongside the testimonial.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>
              Compliance with Enforcement Requests and Applicable Laws:{' '}
            </Text>
            Enforcement of Our Rights: In exceptional circumstances, we may
            share information about you with a third party if we believe that
            sharing is reasonably necessary to (a) comply with any applicable
            law, regulation, legal process or governmental request, including to
            meet national security requirements, (b) enforce our agreements,
            policies and terms of service, (c) protect the security or integrity
            of our products and services, (d) protect Employee Experience
            Solution Pte. Ltd., our customers or the public from harm or illegal
            activities, or (e) respond to an emergency which we believe in good
            faith requires us to disclose information to assist in preventing
            the death or serious bodily injury of any person.
          </Text>
          <Text weight={TextWeight.BOLD} mb={24}>
            How we store and secure the information we collect{' '}
          </Text>
          <Text weight={TextWeight.SEMIBOLD}>
            NFORMATION STORAGE AND SECURITY{' '}
          </Text>
          <Text mb={24}>
            We use data hosting service providers to host the information we
            collect, and we use technical measures to secure your data. While we
            implement safeguards designed to protect your information, no
            security system is impenetrable and due to the inherent nature of
            the Internet, we cannot guarantee that data, during transmission
            through the Internet or while stored on our systems or otherwise in
            our care, is absolutely safe from intrusion by others. We will
            respond to requests about this within a reasonable time frame.
          </Text>
          <Text weight={TextWeight.SEMIBOLD}>HOW LONG WE KEEP INFORMATION</Text>
          <Text mb={24}>
            How long we keep information we collect about you depends on the
            type of information, as described in further detail below. After
            such time, we will either delete or anonymize your information or,
            if this is not possible (for example, because the information has
            been stored in backup archives), then we will securely store your
            information and isolate it from any further use until deletion is
            possible.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>• Account information: </Text>
            We retain your information as long as required by the administrator
            of your account. We also retain some of your information after your
            account was disable to comply with our legal obligations, to resolve
            disputes, to enforce our agreements, to support business operations
            and to continue to develop and improve our Services. Where we retain
            information for Service improvement and development, we take steps
            to eliminate formation that directly identifies you, and we only use
            the information to uncover collective insights about the use of our
            Services, not to specifically analyze personal characteristics about
            you.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>
              • Information you share on the Services:{' '}
            </Text>
            If your account is disabled, anonymised information will be stored
            in order to continue improving the Services.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>• Marketing information: </Text>
            If you have elected to receive marketing emails from us, we retain
            information about your marketing preferences unless you specifically
            ask us to delete such information. We retain information derived
            from cookies and other tracking technologies for a reasonable period
            of time from the date such information was created.
          </Text>
          <Text weight={TextWeight.BOLD}>
            How to access and control your information
          </Text>
          <Text mb={24}>
            You have certain choices available to you when it comes to your
            information. Below is a summary of those choices, how to exercise
            them and any limitations. We will respond to requests about this
            within a reasonable time frame.
          </Text>
          <Text weight={TextWeight.SEMIBOLD}>YOUR CHOICES:</Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>
              Access and update your information:{' '}
            </Text>
            Our Services give you the ability to access and update certain
            information about you from within the Service. For example, you can
            access your profile information from your account and search for
            content containing information about you using key word searches in
            the Service. You can update your profile information within your
            profile settings and modify content that contains information about
            you using the editing tools associated with that content.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>
              Deactivate or delete subscription to a team or enterprise:{' '}
            </Text>
            Only your administrator can deactivate your access to a team or
            enterprise. Please contact your administrator. If you are an
            administrator and are unable to deactivate an account through your
            administrator settings, please contact Employee Experience Solution
            Pte. Ltd. support.
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>
              Opt out of communications:{' '}
            </Text>
            You may opt out of receiving promotional communications from us by
            using the unsubscribe link within each email or by contacting us as
            provided below to have your contact information removed from our
            promotional email list or registration database. Even after you opt
            out from receiving promotional messages from us, you will continue
            to receive transactional messages from us regarding our Services.
            You can opt out of some notification messages in your account
            settings. Please note, you will continue to receive generic ads.{' '}
          </Text>
          <Text mb={24}>
            <Text weight={TextWeight.SEMIBOLD}>Data portability: </Text>
            Data portability: Data portability is the ability to obtain some of
            your information in a format you can move from one service provider
            to another (for instance, when you transfer your mobile phone number
            to another carrier). Depending on the context, this applies to some
            of your information, but not to all of your information.
          </Text>
          <Text weight={TextWeight.BOLD}>
            Other important privacy information
          </Text>
          <Text weight={TextWeight.SEMIBOLD}>Notice to End Users</Text>
          <Text mb={24}>
            Our products are intended for both personal use and use by
            organizations. Because the Services are made available to you
            through an organization (e.g. your employer), that organization is
            the administrator of the Services and is responsible for the
            end-users and/or Service sites over which it has control. Please
            direct your data privacy questions to your administrator, as your
            use of the Services is subject to that organization's policies. We
            are not responsible for the privacy or security practices of an
            administrator's organization, which may be different than this
            policy.
          </Text>
          <Text mb={24}>
            Even if the Services are not currently administered to you by an
            organization, if you are a member of a team administered by an
            organization, or if you use an email address provided by an
            organization (such as your work email address) to access the
            Services, then the administrator of that team or the owner of the
            domain associated with your organizational email address (e.g. your
            employer) may assert administrative control over your account and
            use of the Services at a later date. You will be notified if this
            happens.
          </Text>
          <Text mb={24}>
            Team and enterprise administrators or managers are able to restrict
            your access to and privileges within the Services. In some cases,
            enterprise administrators can also:
          </Text>
          <Text mb={24}>• Require you to reset your account password; </Text>
          <Text mb={24}>
            • Restrict, suspend or terminate your access to the Services or your
            account;
          </Text>
          <Text mb={24}>
            • Control your ability to edit, restrict, modify or delete account
            information;
          </Text>
          <Text mb={24}>
            • Change your account information, including profile information or
            the email address associated with your account;
          </Text>
          <Text mb={24}>• Access information in and about your account; </Text>
          <Text mb={24}>
            • Access or retain information stored as part of your account; and
          </Text>
          <Text mb={24}>
            Please contact your organization or refer to your administrator’s
            organizational policies for more information.
          </Text>
          <Text weight={TextWeight.SEMIBOLD}>
            Changes to our Privacy Policy
          </Text>
          <Text mb={24}>
            We may change this privacy policy from time to time. If the changes
            are significant, we will provide a more prominent notice by adding a
            notice on the Services homepage, login screen or by sending you an
            email notification. We will also keep prior versions of this Privacy
            Policy in an archive for your review. We encourage you to review our
            privacy policy whenever you use the Services to stay informed about
            our information practices and the ways you can help protect your
            privacy.
          </Text>
          <Text weight={TextWeight.SEMIBOLD}>
            If you disagree with any changes to this privacy policy, you will
            need to stop using the Services and deactivate your account(s), as
            outlined above.
          </Text>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndPolicies;
