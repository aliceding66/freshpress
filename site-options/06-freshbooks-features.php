<?php
	$modal_example_image = fp_get_asset( 'images/pricing/pricing-modal-example.png' );

	return [
		'plans_data'      => [
			'lite_includes'    => [
				[
					'title'         => 'Send Unlimited Invoices to up to 5 Clients',
					'bold'          => false,
					'modal_heading' => 'Start with a slick invoice template then…',
					'modal_content' => <<<HTML
<ul>
	<li>Customize your invoices with your brand colors and logo</li>
	<li>Get notifications when clients view invoices to stay in the know</li>
	<li>Auto-charge late fees when clients are misbehaving</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/Carousel-Invoicing.webp',
				],
				[
					'title'         => 'Track Unlimited Expenses',
					'bold'          => false,
					'modal_heading' => 'Easy-to-use expense management tools to run your business better',
					'modal_content' => <<<HTML
<ul>
	<li>Automatically track and record Expenses so you'll always know where your money's going</li>
	<li>Stay on budget with straightforward summaries of your spending by category</li>
	<li>Tax-friendly categories keep your expenses sorted and organized for tax season</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/goodbye-manual-expensing.png',
				],
				[
					'title'         => 'Send Unlimited Estimates',
					'bold'          => false,
					'modal_heading' => 'Set clear expectations with clients from the start',
					'modal_content' => <<<HTML
<ul>
	<li>Easily customize the look and content of each Estimate to fit your needs</li>
	<li>Get client approval with just one click, or respond to their feedback from your desktop or smartphone</li>
	<li>Turn Estimates into Invoices in seconds, and get paid that much faster</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/estimates-accepted-1.png.webp',
				],
				[
					'title'         => 'Get Paid With Credit Cards and Bank Transfer',
					'bold'          => false,
					'modal_heading' => 'Online payments get you paid 2x faster',
					'modal_content' => <<<HTML
<ul>
	<li>Accept bank and credit card payments right on invoices</li>
	<li>Allow clients to securely store credit card details making it easier for them to pay</li>
	<li>Automated tracking of $$$ in and out keeps your books ready for tax time</li>
	<li>Easily share Checkout Links in email, text, or on your website for fast invoice-free payments</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/payments-online-payments@2x.png.webp',
				],
				[
					'title'         => 'Run Reports for an Easy Tax Time',
					'bold'          => true,
					'modal_heading' => 'Reports give you the "down-low" on how your financial health',
					'modal_content' => <<<HTML
<ul>
	<li>Profit and Loss - See total income and expenses to know exactly how profitable you are</li>
	<li>Sales Tax Summary - Make remittances painless by always knowing the sales taxes you’ve paid and collected in any period</li>
	<li>Balance Sheet - Get an account of business assets, outstanding debts/liabilities, and owner/shareholder equity</li>
	<li>Expense Report - Get a detailed breakdown of expenses in any given time frame</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/reports-total-profit@2x.png.webp',
				],
				[
					'title'         => 'Access From Anywhere on iOS and Android',
					'bold'          => false,
					'modal_heading' => 'Stay connected to your business on the go',
					'modal_content' => <<<HTML
<ul>
	<li>Send and track all estimates, invoices, and payments on the go</li>
	<li>Conveniently track time anytime, from anywhere</li>
	<li>Snap photos to log receipts with your mobile camera</li>
	<li>Track and log mileage with mileage tracker</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/mobile-conversations_opt@2x-e1600989255304.jpg.webp',
				],
			],
			'lite_addons'      => [
				[
					'title'         => 'Team Members',
					'subtext'       => '($10 per user per month)',
					'modal_heading' => 'Spend less time managing your projects and your people',
					'modal_content' => <<<HTML
<ul>
	<li>Invite the whole team to your account for better collaboration, improved productivity, and fewer mistakes</li>
	<li>Track time, log expenses and mileage, and work with team members and clients — all on one app</li>
	<li>You control what each person has access to, depending on the role you give them</li>
</ul>
HTML,
					'modal_image'   => 'yt:dVbjvhgGPbs',
				],
				[
					'title'         => 'Advanced Payments',
					'subtext'       => '($20 per month)',
					'modal_heading' => 'The smart billing solution for smart business owners',
					'modal_content' => <<<HTML
<ul>
	<li>Securely accept payments online, in person, and over the phone with our easy-to-use virtual terminal</li>
	<li>Save client credit card details for future invoices so you can stop waiting on payments and regulate your cash flow</li>
	<li>Set up recurring billing profiles and schedule subscription payments for specific clients to take the guesswork out of billing</li>
</ul>
HTML,
					'modal_image'   => 'yt:UE-b9j8dq-A',
				],
				[
					'title'         => 'Gusto Payroll',
					'subtext'       => '(talk to our Specialists to learn more)',
					'modal_heading' => 'Finally, an integration that works as hard as you do',
					'modal_content' => <<<HTML
<ul>
	<li>Connect your Gusto account to import and track payroll transactions in FreshBooks</li>
	<li>Always up-to-date finances means more accurate expense reports and books</li>
	<li>Automatically categorize Payroll Runs as Expenses and manage them all right from your FreshBooks account</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/4406752776973/PayrollSection.png',
				],
			],
			'plus_includes'    => [
				[
					'title'         => 'Send Unlimited Invoices to up to 50 Clients',
					'bold'          => false,
					'modal_heading' => 'Customize your invoices with your brand colors and logo then…',
					'modal_content' => <<<HTML
<ul>
	<li>Get notifications when clients view invoices to stay in the know</li>
	<li>Auto-charge late fees when clients are misbehaving</li>
	<li>Set up automated recurring invoices for fast hands-free invoicing</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/Carousel-Invoicing.webp',
				],
				[
					'title'         => 'Automatically Track Expenses',
					'bold'          => false,
					'modal_heading' => 'Easy-to-use expense management tools to run your business better',
					'modal_content' => <<<HTML
<ul>
	<li>Automatically track and record Expenses so you'll always know where your money's going</li>
	<li>Stay on budget with straightforward summaries of your spending by category</li>
	<li>Tax-friendly categories keep your expenses sorted and organized for tax season</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/expense-track-business_opt@2x-1.png',
				],
				[
					'title'         => 'Automatically Capture Receipt Data',
					'bold'          => false,
					'modal_heading' => 'Organize your expenses in the cloud effortlessly',
					'modal_content' => <<<HTML
<ul>
	<li>No more shoeboxes full of receipts — keep your expenses perfectly organized and preserved for tax season</li>
	<li>Upload a picture of your receipt and FreshBooks automatically captures the merchant, total, and taxes for your review</li>
	<li>Upload receipts in bulk to save time on expense tracking</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/expenses-ocr-mobile-3.png.webp',
				],
				[
					'title'         => 'Email Receipts Right to Your Account',
					'bold'          => false,
					'modal_heading' => 'Get a receipt through email? Just forward it directly into your account',
					'modal_content' => <<<HTML
<ul>
	<li>Capture any receipt received in your email simply by forwarding it to a dedicated email address</li>
	<li>Merchant, totals, and taxes are automatically scanned</li>
	<li>Use your dedicated email address with vendors for even faster processing</li>
</ul>
HTML,
					'modal_image'   => '',
				],
				[
					'title'         => 'Send Unlimited Estimates and Proposals',
					'bold'          => false,
					'modal_heading' => 'Set clear expectations with clients from the start',
					'modal_content' => <<<HTML
<ul>
	<li>Easily customize the look and content of each Estimate or Proposal to fit your needs</li>
	<li>Get client approval with just one click, or respond to their feedback from your desktop or smartphone</li>
	<li>Convert Estimates and Proposals into Invoices in seconds to get paid that much faster</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/estimates-accepted-1.png.webp',
				],
				[
					'title'         => 'Get Paid With Credit Cards and Bank Transfer',
					'bold'          => true,
					'modal_heading' => 'Online payments get you paid 2x faster',
					'modal_content' => <<<HTML
<ul>
	<li>Accept bank and credit card payments right on invoices</li>
	<li>Allow clients to securely store credit card details making it easier for them to pay</li>
	<li>Automated tracking of $$$ in and out keeps your books ready for tax time</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/payments-online-payments@2x.png.webp',
				],
				[
					'title'         => 'Set Up Recurring Bills and Client Retainers',
					'bold'          => false,
					'modal_heading' => 'Manage your time and your cash flow more effectively',
					'modal_content' => <<<HTML
<ul>
	<li>Set up recurring billing profiles and schedule subscription payments for specific clients to take the guesswork out of billing</li>
	<li>Accurately forecast your monthly workload and revenue by collecting fixed payments from clients in advance, then billing and tracking time against that amount</li>
	<li>With fewer invoices to worry about, you can spend more time growing your business</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/automate-billing@2x.png.webp',
				],
				[
					'title'         => 'Run Business Health Reports',
					'bold'          => false,
					'modal_heading' => 'Make confident business decisions with ease',
					'modal_content' => <<<HTML
<ul>
	<li>Analyze the health of your business and make better decisions with real-time financial data and powerful insights</li>
	<li>Balance sheets, profit and loss statements, cash flow statements, and more give a comprehensive view of your finances. Export or download them for your accountant</li>
	<li>Filter records by client, team member, or date for a detailed look at your financial health</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/Carousel-Reports.webp',
				],
				[
					'title'         => 'Run Financial and Accounting Reports',
					'bold'          => false,
					'modal_heading' => 'Intelligent reports that are easy to understand and easier to use',
					'modal_content' => <<<HTML
<ul>
	<li>Automatic checks and balances ensure accuracy and compliance in your reporting</li>
	<li>Industry-standard double-entry accounting tools help you set aside enough for taxes, understand the costs of running your business, and confidently forecast earnings</li>
	<li>Use financial reports to make smarter business decisions and easily work with your accountant</li>
</ul>
HTML,
					'modal_image'   => 'https://test5.web.freshenv.com/wp-content/themes/freshpress/dist/images/pricing/pricing-modal-example.01f0fdb9.png',
				],
				[
					'title'         => 'Invite Your Accountant',
					'bold'          => false,
					'modal_heading' => "Smart tools to make your accountant's job easier",
					'modal_content' => <<<HTML
<ul>
	<li>Invite your accountant to your FreshBooks account with just a few clicks</li>
	<li>Limit access to the data needed to support your business during tax time or any other time</li>
	<li>Review your books and financial reports with your accountant in real-time so your business continues to run smoothly</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/FvxV9tzg.png',
				],
				[
					'title'         => 'Access From Anywhere on iOS and Android',
					'bold'          => false,
					'modal_heading' => 'Stay connected to your business on the go',
					'modal_content' => <<<HTML
<ul>
	<li>Send and track all estimates, invoices, and payments on the go</li>
	<li>Easily share Checkout Links from your phone for fast invoice-free payments</li>
	<li>Conveniently track time anytime, from anywhere</li>
	<li>Snap photos to log expenses with your mobile camera</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/mobile-conversations_opt@2x-e1600989255304.jpg.webp',
				],
				[
					'title'         => 'Mobile Mileage Tracking',
					'bold'          => false,
					'modal_heading' => 'Never miss a mileage deduction again',
					'modal_content' => <<<HTML
<ul>
	<li>Automatically log every trip as you drive with our mileage tracker app for iOS and Android</li>
	<li>Save your travel history, categorize business and personal trips, and manually edit trip details so you can claim every expense come tax time</li>
	<li>Review potential deductions and tax-compliant mileage reports from your smartphone or desktop</li>
	<li>Use the mileage tracker with your team for uniform logs and reports that are automatically added to your FreshBooks account</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/product-tour-mileage-tracking-mobileWork-1.png',
				],
			],
			'plus_addons'      => [
				[
					'title'         => 'Team Members',
					'subtext'       => '($10 per user per month)',
					'modal_heading' => 'Spend less time managing your projects and your people',
					'modal_content' => <<<HTML
<ul>
	<li>Invite the whole team to your account for better collaboration, improved productivity, and fewer mistakes</li>
	<li>Track time, log expenses and mileage, and work with team members and clients — all on one app</li>
	<li>You control what each person has access to, depending on the role you give them</li>
</ul>
HTML,
					'modal_image'   => 'yt:dVbjvhgGPbs',
				],
				[
					'title'         => 'Advanced Payments',
					'subtext'       => '($20 per month)',
					'modal_heading' => 'The smart billing solution for smart business owners',
					'modal_content' => <<<HTML
<ul>
	<li>Securely accept payments online, in person, and over the phone with our easy-to-use virtual terminal</li>
	<li>Save client credit card details for future invoices so you can stop waiting on payments and regulate your cash flow</li>
	<li>Set up recurring billing profiles and schedule subscription payments for specific clients to take the guesswork out of billing</li>
</ul>
HTML,
					'modal_image'   => 'yt:UE-b9j8dq-A',
				],
				[
					'title'         => 'Gusto Payroll',
					'subtext'       => '(talk to our Specialists to learn more)',
					'modal_heading' => 'Finally, an integration that works as hard as you do',
					'modal_content' => <<<HTML
<ul>
	<li>Connect your Gusto account to import and track payroll transactions in FreshBooks</li>
	<li>Always up-to-date finances means more accurate expense reports and books</li>
	<li>Automatically categorize Payroll Runs as Expenses and manage them all right from your FreshBooks account</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/4406752776973/PayrollSection.png',
				],
			],
			'premium_includes' => [
				[
					'title'         => 'Send Unlimited Invoices to an Unlimited Amount of Clients',
					'bold'          => false,
					'modal_heading' => 'Customize your invoices with your brand colors and logo then…',
					'modal_content' => <<<HTML
<ul>
	<li>Get notifications when clients view invoices to stay in the know</li>
	<li>Auto-charge late fees when clients are misbehaving</li>
	<li>Set up automated recurring invoices for fast hands-free invoicing</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/Carousel-Invoicing.webp',
				],
				[
					'title'         => 'Track Bills, Bill Payments & Vendors With Accounts Payable',
					'bold'          => false,
					'modal_heading' => 'Track Bills, Bill Payments & Vendors With Accounts Payable',
					'modal_content' => <<<HTML
<ul>
	<li>Easily track and manage multiple vendors using multiple different payment methods</li>
	<li>Track outstanding Bills, so you never miss a payment</li>
	<li>Foster better relationships with vendors who will trust you to pay on time</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/accounting-ocr.png.webp',
				],
				[
					'title'         => 'Track Project Profitability',
					'bold'          => false,
					'modal_heading' => 'Make smarter decisions about your work and business',
					'modal_content' => <<<HTML
<ul>
	<li>Easily track project success and team performance with powerful tools and dashboards</li>
	<li>Review how you're spending time and money with in-depth reports to make better decisions on the fly</li>
	<li>Profitability summaries show which services cost you the most so you can lower margins and increase profits</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/Carousel-Projects.webp',
				],
				[
					'title'         => 'Customize Email Templates With Dynamic Fields',
					'bold'          => false,
					'modal_heading' => 'Communicate with clients your way',
					'modal_content' => <<<HTML
<ul>
	<li>Add your logo and branding to every email with customized templates</li>
	<li>Easily personalize the subject and body with dynamic fields</li>
	<li>Create your own email signature for a personal touch</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/4408255170061/SimpleTemplate.png',
				],
				[
					'title'         => 'Customize Email Signatures',
					'bold'          => false,
					'modal_heading' => 'Every personal touch helps build client connections',
					'modal_content' => <<<HTML
<ul>
	<li>Customize signatures to help personalize each client’s experience to foster strong client relationships</li>
	<li>Easily personalize the subject and body with dynamic fields</li>
	<li>Add your logo and branding to every email</li>
</ul>
HTML,
					'modal_image'   => '',
				],
				[
					'title'         => 'Automatically Track Expenses',
					'bold'          => false,
					'modal_heading' => 'Easy-to-use expense management tools to run your business better',
					'modal_content' => <<<HTML
<ul>
	<li>Automatically track and record Expenses so you'll always know where your money's going</li>
	<li>Stay on budget with straightforward summaries of your spending by category</li>
	<li>Tax-friendly categories keep your expenses sorted and organized for tax season</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/expense-track-business_opt@2x-1.png',
				],
				[
					'title'         => 'Automatically Capture Bills and Receipt Data',
					'bold'          => false,
					'modal_heading' => 'Organize your expenses in the cloud effortlessly',
					'modal_content' => <<<HTML
<ul>
	<li>No more shoeboxes full of receipts — keep your expenses perfectly organized and preserved for tax season</li>
	<li>Upload a picture of your receipt and FreshBooks automatically captures the merchant, total, and taxes for your review</li>
	<li>Upload receipts in bulk to save time on expense tracking</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/expenses-ocr-mobile-3.png',
				],
				[
					'title'         => 'Automatically Send Late Payment Reminders and Bill Late Fees',
					'bold'          => false,
					'modal_heading' => 'Stop chasing after late payments — let FreshBooks do it for you',
					'modal_content' => <<<HTML
<ul>
	<li>Save time and effort following up on Invoices so you can focus on the work that matters</li>
	<li>Set up multiple reminders to nudge forgetful clients as often as you need to</li>
	<li>Add late fees and taxes to overdue Invoices with just a few clicks</li>
	<li>Set a deadline, and FreshBooks will automatically calculate and add the charges for you once the date has passed</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/SendRemindersCheckedOff.png',
				],
				[
					'title'         => 'Send Unlimited Estimates and Proposals',
					'bold'          => false,
					'modal_heading' => 'Set clear expectations with clients from the start',
					'modal_content' => <<<HTML
<ul>
	<li>Easily customize the look and content of each Estimate or Proposal to fit your needs</li>
	<li>Get client approval with just one click, or respond to their feedback from your desktop or smartphone</li>
	<li>Convert Estimates and Proposals into Invoices in seconds to get paid that much faster</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/estimates-accepted-1.png.webp',
				],
				[
					'title'         => 'Get Paid With Credit Cards and Bank Transfers',
					'bold'          => false,
					'modal_heading' => 'Online payments get you paid 2x faster',
					'modal_content' => <<<HTML
<ul>
	<li>Accept bank and credit card payments right on invoices</li>
	<li>Store client payment methods for easy payment later</li>
	<li>Automated tracking of $$$ in and out keeps your books ready for tax time</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/payments-online-payments@2x.png.webp',
				],
				[
					'title'         => 'Get Paid With Checkout Links',
					'bold'          => false,
					'modal_heading' => 'Accept online payments anywhere, anytime',
					'modal_content' => <<<HTML
<ul>
	<li>Share Checkout Links to instantly collect payments on fixed price items and services</li>
	<li>Share Checkout Links in email, text, or on your website for fast invoice-free payments</li>
	<li>FreshBooks automatically creates and sends receipts to your customers after each transaction, so you don't have to</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/checkout-links@2x.png',
				],
				[
					'title'         => 'Set Up Recurring Billing and Client Retainers',
					'bold'          => false,
					'modal_heading' => 'Manage your time and your cash flow more effectively',
					'modal_content' => <<<HTML
<ul>
	<li>Set up recurring billing profiles and schedule subscription payments for specific clients to take the guesswork out of billing</li>
	<li>Accurately forecast your monthly workload and revenue by collecting fixed payments from clients in advance, then billing and tracking time against that amount</li>
	<li>With fewer invoices to worry about, you can spend more time growing your business</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/automate-billing@2x.png',
				],
				[
					'title'         => 'Run Business Health Reports',
					'bold'          => false,
					'modal_heading' => 'Make confident business decisions with ease',
					'modal_content' => <<<HTML
<ul>
	<li>Analyze the health of your business and make better decisions with real-time financial data and powerful insights</li>
	<li>Balance sheets, profit and loss statements, cash flow statements, and more give a comprehensive view of your finances. Export or download them for your accountant</li>
	<li>Filter records by client, team member, or date for a detailed look at your financial health</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/Carousel-Reports.webp',
				],
				[
					'title'         => 'Run Financial and Accounting Reports',
					'bold'          => false,
					'modal_heading' => 'Intelligent reports that are easy to understand and easier to use',
					'modal_content' => <<<HTML
<ul>
	<li>Automatic checks and balances ensure accuracy and compliance in your reporting</li>
	<li>Industry-standard double-entry accounting tools help you set aside enough for taxes, understand the costs of running your business, and confidently forecast earnings</li>
	<li>Use financial reports to make smarter business decisions and easily work with your accountant</li>
</ul>
HTML,
					'modal_image'   => 'https://test5.web.freshenv.com/wp-content/themes/freshpress/dist/images/pricing/pricing-modal-example.01f0fdb9.png',
				],
				[
					'title'         => 'Invite Your Accountant',
					'bold'          => false,
					'modal_heading' => "Smart tools to make your accountant's job easier",
					'modal_content' => <<<HTML
<ul>
	<li>Invite your accountant to your FreshBooks account with just a few clicks</li>
	<li>Limit access to the data needed to support your business during tax time or any other time</li>
	<li>Review your books and financial reports with your accountant in real-time so your business continues to run smoothly</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/FvxV9tzg.png',
				],
				[
					'title'         => 'Access From Anywhere on iOS and Android',
					'bold'          => false,
					'modal_heading' => 'Stay connected to your business on the go',
					'modal_content' => <<<HTML
<ul>
	<li>Send and track all estimates, invoices, and payments on the go</li>
	<li>Easily share Checkout Links in email, text, or on your website for fast invoice-free payments</li>
	<li>Conveniently track time anytime, from anywhere</li>
	<li>Snap photos to log expenses with your mobile camera</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/mobile-conversations_opt@2x-e1600989255304.jpg.webp',
				],
				[
					'title'         => 'Mobile Mileage Tracking',
					'bold'          => false,
					'modal_heading' => 'Never miss a mileage deduction again',
					'modal_content' => <<<HTML
<ul>
	<li>Automatically log every trip as you drive with our mileage tracker app for iOS and Android</li>
	<li>Save your travel history, categorize business and personal trips, and manually edit trip details so you can claim every expense come tax time</li>
	<li>Review potential deductions and tax-compliant mileage reports from your smartphone or desktop</li>
	<li>Use the mileage tracker with your team for uniform logs and reports that are automatically added to your FreshBooks account</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/product-tour-mileage-tracking-mobileWork-1.png',
				],
			],
			'premium_addons'   => [
				[
					'title'         => 'Team Members',
					'subtext'       => '($10 per user per month)',
					'modal_heading' => 'Spend less time managing your projects and your people',
					'modal_content' => <<<HTML
<ul>
	<li>Invite the whole team to your account for better collaboration, improved productivity, and fewer mistakes</li>
	<li>Track time, log expenses and mileage, and work with team members and clients — all on one app</li>
	<li>You control what each person has access to, depending on the role you give them</li>
</ul>
HTML,
					'modal_image'   => 'yt:dVbjvhgGPbs',
				],
				[
					'title'         => 'Advanced Payments',
					'subtext'       => '($20 per month)',
					'modal_heading' => 'The smart billing solution for smart business owners',
					'modal_content' => <<<HTML
<ul>
	<li>Securely accept payments online, in person, and over the phone with our easy-to-use virtual terminal</li>
	<li>Save client credit card details for future invoices so you can stop waiting on payments and regulate your cash flow</li>
	<li>Set up recurring billing profiles and schedule subscription payments for specific clients to take the guesswork out of billing</li>
</ul>
HTML,
					'modal_image'   => 'yt:UE-b9j8dq-A',
				],
				[
					'title'         => 'Gusto Payroll',
					'subtext'       => '(talk to our Specialists to learn more)',
					'modal_heading' => 'Finally, an integration that works as hard as you do',
					'modal_content' => <<<HTML
<ul>
	<li>Connect your Gusto account to import and track payroll transactions in FreshBooks</li>
	<li>Always up-to-date finances means more accurate expense reports and books</li>
	<li>Automatically categorize Payroll Runs as Expenses and manage them all right from your FreshBooks account</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/4406752776973/PayrollSection.png',
				],
			],
			'select_includes'  => [
				[
					'title'         => 'Send Unlimited Invoices to an Unlimited Amount of Clients',
					'bold'          => false,
					'modal_heading' => 'Customize your invoices with your brand colors and logo then…',
					'modal_content' => <<<HTML
<ul>
	<li>Get notifications when clients view invoices to stay in the know</li>
	<li>Auto-charge late fees when clients are misbehaving</li>
	<li>Set up automated recurring invoices for fast hands-free invoicing</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/Carousel-Invoicing.webp',
				],
				[
					'title'         => 'Access to Lower Credit Card Transaction Fees and Capped ACH Fees',
					'bold'          => true,
					'modal_heading' => 'Do more of what you want with your money',
					'modal_content' => <<<HTML
<ul>
	<li>Take advantage of reduced rates and save money on every transaction</li>
	<li>Stretch your profits even further, or reinvest the savings in your business</li>
	<li>Get paid faster than by check, with zero setup fees, monthly fees, or minimum charges</li>
</ul>
HTML,
					'modal_image'   => 'https://dl.airtable.com/.attachmentThumbnails/d61dc1e522ac82427df05b42839c5950/bc588055',
				],
				[
					'title'         => 'Start With 2 Team Member Accounts',
					'bold'          => false,
					'modal_heading' => 'Bring your team on board for better workflows and customer service',
					'modal_content' => <<<HTML
<ul>
	<li>Your FreshBooks account comes with 2 free team member accounts so you can produce better work faster</li>
	<li>Invite Contractors, Employees, or Business Partners for seamless collaboration on client work and projects</li>
	<li>Control what everyone has access to in your account with team permissions</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/put-people@2x.png',
				],
				[
					'title'         => 'Get a Dedicated Account Manager',
					'bold'          => false,
					'modal_heading' => 'Hit the ground running from day one',
					'modal_content' => <<<HTML
<ul>
	<li>Take advantage of our award-winning support for easier account setup and customization</li>
	<li>Get the full onboarding experience with free training for your entire team and data migration from other platforms</li>
	<li>Get resources to help you make your FreshBooks account work harder for you</li>
</ul>
HTML,
					'modal_image'   => '',
				],
				[
					'title'         => 'Help Migrating From Other Software',
					'bold'          => true,
					'modal_heading' => 'VIP treatment for your Very Important Pecuniary needs',
					'modal_content' => <<<HTML
<ul>
	<li>Import clients, expenses, items, taxes, and vendors from your old program to your FreshBooks account without lifting a finger</li>
	<li>Transfer existing data from QuickBooks, Xero, and more with no downtime</li>
	<li>We do all the heavy lifting so you can keep running your business as usual</li>
</ul>
HTML,
					'modal_image'   => 'yt:Nk1s3gJr2BQ',
				],
				[
					'title'         => 'Get Up and Running With Custom Onboarding Services ',
					'bold'          => false,
					'modal_heading' => 'Training designed with your business in mind',
					'modal_content' => <<<HTML
<ul>
	<li>Build a backend experience that works best for your business</li>
	<li>Take advantage of everything that FreshBooks has to offer with the help of your account manager</li>
	<li>Become an expert on your finances with customized training sessions for you and your team</li>
</ul>
HTML,
					'modal_image'   => '',
				],
				[
					'title'         => 'Remove FreshBooks Branding From Client Emails',
					'bold'          => false,
					'modal_heading' => "Show off the brand you've worked hard to create",
					'modal_content' => <<<HTML
<ul>
	<li>Keep your branding consistent, and featured on invoices</li>
	<li>Hide the FreshBooks logo from your emails to keep your business front and center</li>
	<li>Ensure that your clients see you as the professional you are</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/NoBrandingEmail.png',
				],
				[
					'title'         => 'A Dedicated Number for Exclusive Select Support',
					'bold'          => false,
					'modal_heading' => 'Hit the ground running from day one',
					'modal_content' => <<<HTML
<ul>
	<li>Take advantage of our award-winning support for easier account setup and customization</li>
	<li>Get the full onboarding experience with free training for your entire team and data migration from other platforms</li>
	<li>Get resources to help you make your FreshBooks account work harder for you</li>
</ul>
HTML,
					'modal_image'   => 'https://test5.web.freshenv.com/wp-content/uploads/support-fun-jess-600x600.jpg',
				],
				[
					'title'         => 'Get Paid With Credit Cards and Bank Transfers',
					'bold'          => false,
					'modal_heading' => 'Online payments get you paid 2x faster',
					'modal_content' => <<<HTML
<ul>
	<li>Accept bank and credit card payments right on invoices</li>
	<li>Store client payment methods for easy payment later</li>
	<li>Automated tracking of $$$ in and out keeps your books ready for tax time</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/payments-online-payments@2x.png.webp',
				],
				[
					'title'         => 'Get Paid With Checkout Links',
					'bold'          => false,
					'modal_heading' => 'Accept online payments anywhere, anytime',
					'modal_content' => <<<HTML
<ul>
	<li>Share Checkout Links to instantly collect payments on fixed price items and services</li>
	<li>Share Checkout Links in email, text, or on your website for fast invoice-free payments</li>
	<li>FreshBooks automatically creates and sends receipts to your customers after each transaction, so you don't have to</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/checkout-links@2x.png',
				],
				[
					'title'         => 'Set Up Recurring Billing and Client Retainers',
					'bold'          => false,
					'modal_heading' => 'Manage your time and your cash flow more effectively',
					'modal_content' => <<<HTML
<ul>
	<li>Set up recurring billing profiles and schedule subscription payments for specific clients to take the guesswork out of billing</li>
	<li>Accurately forecast your monthly workload and revenue by collecting fixed payments from clients in advance, then billing and tracking time against that amount</li>
	<li>With fewer invoices to worry about, you can spend more time growing your business</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/automate-billing@2x.png',
				],
				[
					'title'         => 'Securely Accept Credit Card Payments',
					'bold'          => false,
					'modal_heading' => 'The smart billing solution for smart business owners',
					'modal_content' => <<<HTML
<ul>
	<li>Securely accept payments online, in person, and over the phone with FreshBooks Advanced Payments (virtual terminal)</li>
	<li>Save client credit card details for future invoices to avoid waiting on payments and regulate your cash flow</li>
	<li>Set up recurring billing profiles and payments for specific clients to take the guesswork out of billing</li>
	<li>Set credit card payment as default on invoices to ensure fast payment and healthy cash flow</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/Carousel-Payments.webp',
				],
				[
					'title'         => 'Automatically Track Expenses',
					'bold'          => false,
					'modal_heading' => 'Easy-to-use expense management tools to run your business better',
					'modal_content' => <<<HTML
<ul>
	<li>Automatically track and record Expenses so you'll always know where your money's going</li>
	<li>Stay on budget with straightforward summaries of your spending by category</li>
	<li>Tax-friendly categories keep your expenses sorted and organized for tax season</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/expense-track-business_opt@2x-1.png',
				],
				[
					'title'         => 'Instantly Capture Every Line Item on Bills',
					'bold'          => false,
					'modal_heading' => 'Automatically log all details from bills',
					'modal_content' => <<<HTML
<ul>
	<li>Take a photo, upload a file, or forward an email to FreshBooks to capture bills and receipts</li>
	<li>Automatically have each line item of a bill scanned and categorized, waiting for your notes and review</li>
	<li>Automatically capture the merchant, line items, totals, and taxes from each bill</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/expenses-ocr-mobile.png',
				],
				[
					'title'         => 'Automatically Send Late Payment Reminders and Bill Late Fees',
					'bold'          => false,
					'modal_heading' => 'Stop chasing after late payments — let FreshBooks do it for you',
					'modal_content' => <<<HTML
<ul>
	<li>Save time and effort following up on Invoices so you can focus on the work that matters</li>
	<li>Set up multiple reminders to nudge forgetful clients as often as you need to</li>
	<li>Add late fees and taxes to overdue Invoices with just a few clicks</li>
	<li>Set a deadline, and FreshBooks will automatically calculate and add the charges for you once the date has passed</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/SendRemindersCheckedOff.png',
				],
				[
					'title'         => 'Run Business Health Reports',
					'bold'          => false,
					'modal_heading' => 'Make confident business decisions with ease',
					'modal_content' => <<<HTML
<ul>
	<li>Analyze the health of your business and make better decisions with real-time financial data and powerful insights</li>
	<li>Balance sheets, profit and loss statements, cash flow statements, and more give a comprehensive view of your finances. Export or download them for your accountant</li>
	<li>Filter records by client, team member, or date for a detailed look at your financial health</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/Carousel-Reports.webp',
				],
				[
					'title'         => 'Run Financial and Accounting Reports',
					'bold'          => false,
					'modal_heading' => 'Intelligent reports that are easy to understand and easier to use',
					'modal_content' => <<<HTML
<ul>
	<li>Automatic checks and balances ensure accuracy and compliance in your reporting</li>
	<li>Industry-standard double-entry accounting tools help you set aside enough for taxes, understand the costs of running your business, and confidently forecast earnings</li>
	<li>Use financial reports to make smarter business decisions and easily work with your accountant</li>
</ul>
HTML,
					'modal_image'   => 'https://test5.web.freshenv.com/wp-content/themes/freshpress/dist/images/pricing/pricing-modal-example.01f0fdb9.png',
				],
				[
					'title'         => 'Invite Your Accountant',
					'bold'          => false,
					'modal_heading' => "Smart tools to make your accountant's job easier",
					'modal_content' => <<<HTML
<ul>
	<li>Invite your accountant to your FreshBooks account with just a few clicks</li>
	<li>Limit access to the data needed to support your business during tax time or any other time</li>
	<li>Review your books and financial reports with your accountant in real-time so your business continues to run smoothly</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/FvxV9tzg.png',
				],
				[
					'title'         => 'Access From Anywhere on iOS and Android',
					'bold'          => false,
					'modal_heading' => 'Stay connected to your business on the go',
					'modal_content' => <<<HTML
<ul>
	<li>Send and track all estimates, invoices, and payments on the go</li>
	<li>Easily share Checkout Links in email, text, or on your website for fast invoice-free payments</li>
	<li>Conveniently track time anytime, from anywhere</li>
	<li>Snap photos to log expenses with your mobile camera</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/mobile-conversations_opt@2x-e1600989255304.jpg.webp',
				],
				[
					'title'         => 'Mobile Mileage Tracking',
					'bold'          => false,
					'modal_heading' => 'Never miss a mileage deduction again',
					'modal_content' => <<<HTML
<ul>
	<li>Automatically log every trip as you drive with our mileage tracker app for iOS and Android</li>
	<li>Save your travel history, categorize business and personal trips, and manually edit trip details so you can claim every expense come tax time</li>
	<li>Review potential deductions and tax-compliant mileage reports from your smartphone or desktop</li>
	<li>Use the mileage tracker with your team for uniform logs and reports that are automatically added to your FreshBooks account</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/product-tour-mileage-tracking-mobileWork-1.png',
				],
			],
			'select_addons'    => [
				[
					'title'         => 'Team Members',
					'subtext'       => '($10 per user per month)',
					'modal_heading' => 'Spend less time managing your projects and your people',
					'modal_content' => <<<HTML
<ul>
	<li>Invite the whole team to your account for better collaboration, improved productivity, and fewer mistakes</li>
	<li>Track time, log expenses and mileage, and work with team members and clients — all on one app</li>
	<li>You control what each person has access to, depending on the role you give them</li>
</ul>
HTML,
					'modal_image'   => 'yt:dVbjvhgGPbs',
				],
				[
					'title'         => 'Advanced Payments',
					'subtext'       => '($20 per month)',
					'modal_heading' => 'The smart billing solution for smart business owners',
					'modal_content' => <<<HTML
<ul>
	<li>Securely accept payments online, in person, and over the phone with our easy-to-use virtual terminal</li>
	<li>Save client credit card details for future invoices so you can stop waiting on payments and regulate your cash flow</li>
	<li>Set up recurring billing profiles and schedule subscription payments for specific clients to take the guesswork out of billing</li>
</ul>
HTML,
					'modal_image'   => 'yt:UE-b9j8dq-A',
				],
				[
					'title'         => 'Gusto Payroll',
					'subtext'       => '(talk to our Specialists to learn more)',
					'modal_heading' => 'Finally, an integration that works as hard as you do',
					'modal_content' => <<<HTML
<ul>
	<li>Connect your Gusto account to import and track payroll transactions in FreshBooks</li>
	<li>Always up-to-date finances means more accurate expense reports and books</li>
	<li>Automatically categorize Payroll Runs as Expenses and manage them all right from your FreshBooks account</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/4406752776973/PayrollSection.png',
				],
			],
		],
		'comparison_data' => [
			'Track and Organize Client Info' => [
				'Billable Clients'                       => [
					'lite'          => '5 clients',
					'plus'          => '50 clients',
					'premium'       => 'Unlimited',
					'select'        => 'Unlimited',
					'modal_heading' => '',
					'modal_content' => <<<HTML
<ul>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
</ul>
HTML,
					'modal_image'   => '',
				],
				'Client Profiles and Account Statements' => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Everything to know about your clients, all in one place',
					'modal_content' => <<<HTML
<ul>
	<li>Find Invoices, Project details, Reports, and conversations with ease</li>
	<li>Keep notes on the little details to better nurture your client relationships</li>
	<li>Access important information from your phone or desktop anytime, anywhere</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/360079412552/ClientProfileOverview.png',
				],
				'Clients Can Store Credit Card Info'     => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Save payment details now to avoid chasing down checks later',
					'modal_content' => <<<HTML
<ul>
	<li>Let Clients securely store credit card info for easier and faster payments</li>
	<li>Allow Clients to pay Invoices from their account without taking out their wallet</li>
	<li>Automatically pay Invoices for a future free of follow-ups and late payments</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/enter-cc@1x.png.webp',
				],
				'Client Account Portal'                  => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Keep clients in the loop and invested in their projects',
					'modal_content' => <<<HTML
<ul>
	<li>Give clients login-free access FreshBooks to print, or pay Invoices, Estimates, and Proposals</li>
	<li>Allow clients to easily comment on Invoices, Estimates, and Proposals for improved collaboration</li>
	<li>Invite clients to Projects for seamless collaboration and to get them invested in its progress.</li>
</ul>
HTML,
					'modal_image'   => 'yt:eYb6u6rgn5c',
				],
				'Client Credits'                         => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Keep tabs on your income without breaking a sweat',
					'modal_content' => <<<HTML
<ul>
	<li>Track prepayments, overpayments, and Credits notes for each Client</li>
	<li>FreshBooks auto-applies Credits to future invoices so you don't have to</li>
	<li>View every Credit created for specific clients so you know exactly where you stand</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/360096418752/CreditType.png',
				],
				'Automated Recurring Invoices'           => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Spend less time on invoicing and more time on your business',
					'modal_content' => <<<HTML
<ul>
	<li>End busy work in your business — FreshBooks invoices recurring work for you</li>
	<li>Allow clients to input and save credit card details to automate future payments, then set it and forget it</li>
	<li>Set late payment reminders and fees to encourage clients to pay on time every time</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/automate-billing@2x.png.webp',
				],
				'Customized Email Templates and Signatures' => [
					'lite'          => false,
					'plus'          => false,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Communicate with clients your way',
					'modal_content' => <<<HTML
<ul>
	<li>Add your logo and branding to every email with customized templates</li>
	<li>Easily personalize the subject and body with dynamic fields</li>
	<li>Create your own email signature for a personal touch</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/4408255170061/SimpleTemplate.png',
				],
				'Automated Client Emails With Dynamic Fields' => [
					'lite'          => false,
					'plus'          => false,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Project updates you and your clients can count on',
					'modal_content' => <<<HTML
<ul>
	<li>Save time by sending notifications and payment reminders to clients automatically</li>
	<li>Customize messages with dynamic fields that auto-populate specific details</li>
	<li>Notify Clients of sent Invoices, successful payments, new Team Members, and more</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/360060053532/NewInvoiceEmailTemplate.png',
				],
				'Remove FreshBooks Branding From Client Emails' => [
					'lite'          => false,
					'plus'          => false,
					'premium'       => false,
					'select'        => true,
					'modal_heading' => "Show off the brand you've worked hard to create",
					'modal_content' => <<<HTML
<ul>
	<li>Keep your branding consistent, and featured on invoices</li>
	<li>Hide the FreshBooks logo from your emails to keep your business front and center</li>
	<li>Ensure that your clients see you as the professional you are</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/NoBrandingEmail.png',
				],
			],
			'Billing Solutions'              => [
				'Unlimited Estimates'                    => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Set clear expectations with clients from the start',
					'modal_content' => <<<HTML
<ul>
	<li>Easily customize the look and content of each Estimate to fit your needs</li>
	<li>Get client approval with just one click, or respond to their feedback from your desktop or smartphone</li>
	<li>Turn Estimates into Invoices in seconds, and get paid that much faster</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/estimates-accepted-1.png.webp',
				],
				'Accept e-Signatures'                    => [
					'lite'          => false,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Seal the deal in record speed',
					'modal_content' => <<<HTML
<ul>
	<li>Have clients sign off on new projects while they're excited about them</li>
	<li>Enable clients to approve Estimates wherever and whenever, right from their phone or desktop</li>
	<li>Kick off new projects faster, get to work faster, and get paid faster</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/4406958461965/ProposalESigned.png',
				],
				'Unlimited + Customized Invoices'        => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Wow clients with professional invoices that take seconds to create',
					'modal_content' => <<<HTML
<ul>
	<li>You don't need design skills to create impressive invoices. Pick a template, add your logo, and even adjust colors and fonts to keep your branding consistent</li>
	<li>Track invoice status and send automated payment reminders for a healthy cash flow</li>
	<li>Accept payments directly on Invoices so you get paid sooner</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/invoice-customization@2x-2048x827.png.webp',
				],
				'Scheduled Late Fees'                    => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Get paid faster… or get paid more for your troubles',
					'modal_content' => <<<HTML
<ul>
	<li>Automatically add late fees and taxes to overdue Invoices with just a few clicks</li>
	<li>Choose between percentage and flat-rate fees to encourage timely payments</li>
	<li>Set a deadline, and FreshBooks will automatically calculate and add the charges for you once the date has passed</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/360094656871/PercentageOption.png',
				],
				'Automated Late Payment Reminders'       => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Stop chasing after late payments — let FreshBooks do it for you',
					'modal_content' => <<<HTML
<ul>
	<li>Save time and effort following up on Invoices so you can focus on the work that matters</li>
	<li>Customize your emails to get your message across the right way</li>
	<li>Set up multiple reminders to nudge forgetful clients as often as you need to</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/360094656691/SendRemindersCheckedOff.png',
				],
				'Accept Deposits'                        => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Get paid upfront and take control of your cash flow',
					'modal_content' => <<<HTML
<ul>
	<li>Request a Deposit before work starts for steady income throughout the project</li>
	<li>Choose between flat-rate and percentage fees to match your typical payment terms</li>
	<li>Clients who receive Invoices with a Deposit will see the request and due date at the top so they don't miss it</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/115016906148/DepositPercentageFlat.png',
				],
				'Manage Budget and Billing for Projects' => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Cash flow management for busy business owners',
					'modal_content' => <<<HTML
<ul>
	<li>Automate as much (or as little) of your business as you want, from sending payment reminders to letting clients save credit card info in their profile</li>
	<li>See all tracked time, Invoices, and Expenses associated with a Project from the project dashboard</li>
	<li>Assign cost rates, billable rates, and hours to each Project to better understand your profit margins</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/4405327235981/ProjectProfitabilityGraph.png',
				],
				'Unlimited Proposals'                    => [
					'lite'          => false,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Stunning Proposals to set you apart from the competition',
					'modal_content' => <<<HTML
<ul>
	<li>Clearly outline project scope, timeline, and deliverables with content-rich documents that showcase your value — clients can't help but be impressed</li>
	<li>Reuse your most successful Proposals to win more work with less effort</li>
	<li>Know where each prospect stands at any given moment with proposal status updates and notifications</li>
</ul>
HTML,
					'modal_image'   => 'yt:EkSyBhMuHg0',
				],
				'Client Retainers'                       => [
					'lite'          => false,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Manage your time and your cash flow more effectively',
					'modal_content' => <<<HTML
<ul>
	<li>Accurately forecast your monthly workload and revenue by collecting fixed payments from clients in advance, then billing and tracking time against that amount</li>
	<li>Tame scope creep when project specs change by highlighting what's new and its impact on your work</li>
	<li>With fewer invoices to worry about, you can spend more time growing your business </li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/360022689632/RetainerTerms.png',
				],
			],
			'Client Payment Options'         => [
				'Online Credit Card Payments'          => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Get paid 2x faster',
					'modal_content' => <<<HTML
<ul>
	<li>Say hello to automatic deposits and goodbye to chasing clients for checks</li>
	<li>Accept payment right on your Invoices to make it easier for clients to pay you</li>
	<li>Every payment is automatically recorded in your account so your books are always up-to-date</li>
	<li>It's fast, easy, secure, and perfectly integrated…zero setup required</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/Carousel-Payments.webp',
				],
				'Online ACH Bank Transfers (US Only)'  => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Quick and easy payments are just a click away',
					'modal_content' => <<<HTML
<ul>
	<li>Let clients pay Invoices their preferred way, with no hidden fees</li>
	<li>Take advantage of fast and secure bank deposits and easy setup</li>
	<li>You'll always know how much money you're bringing in, thanks to transparent pricing from FreshBooks Payments, Stripe, and PayPal</li>
</ul>
HTML,
					'modal_image'   => '',
				],
				'Checkout Links Get You Paid Without Invoicing' => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Accept online payments anywhere, anytime',
					'modal_content' => <<<HTML
<ul>
	<li>Share Checkout Links with customers to instantly collect payments on fixed price items and services</li>
	<li>Add Checkout Links to your website, social media accounts, and elsewhere online for invoice-free payments</li>
	<li>FreshBooks automatically creates and sends receipts to your customers after each transaction, so you don't have to</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/checkout-links@2x.png',
				],
				'Access to Lower Credit Card Transaction Fees and Capped ACH Fees' => [
					'lite'          => false,
					'plus'          => false,
					'premium'       => false,
					'select'        => true,
					'modal_heading' => 'Do more of what you want with your money',
					'modal_content' => <<<HTML
<ul>
	<li>Take advantage of reduced rates and save money on every transaction</li>
	<li>Stretch your profits even further, or reinvest the savings in your business</li>
	<li>Get paid faster than by check, with zero setup fees, monthly fees, or minimum charges</li>
</ul>
HTML,
					'modal_image'   => 'https://dl.airtable.com/.attachmentThumbnails/d61dc1e522ac82427df05b42839c5950/bc588055',
				],
				'Securely Accept Credit Card Payments' => [
					'lite'          => false,
					'plus'          => false,
					'premium'       => false,
					'select'        => true,
					'modal_heading' => 'The smart billing solution for smart business owners',
					'modal_content' => <<<HTML
<ul>
	<li>Securely accept payments online, in person, and over the phone with FreshBooks Advanced Payments (virtual terminal)</li>
	<li>Save client credit card details for future invoices to avoid waiting on payments and regulate your cash flow</li>
	<li>Set up recurring billing profiles and payments for specific clients to take the guesswork out of billing</li>
	<li>Set credit card payment as default on invoices to ensure fast payment and healthy cash flow</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/Carousel-Payments.webp',
				],
				'Secure Card Storage'                  => [
					'lite'          => false,
					'plus'          => false,
					'premium'       => false,
					'select'        => true,
					'modal_heading' => 'Leave your data security to the experts',
					'modal_content' => <<<HTML
<ul>
	<li>Our industry-leading security protocols keep client payment details and your reputation secure</li>
	<li>Credit card information is automatically redacted to keep it safe from wandering eyes</li>
	<li>FreshBooks is PCI compliant, and we regularly go through audits with a third-party auditor to stay that way</li>
</ul>
HTML,
					'modal_image'   => '',
				],
				'Charge Client Credit Cards'           => [
					'lite'          => false,
					'plus'          => false,
					'premium'       => false,
					'select'        => true,
					'modal_heading' => 'Consistent cash flow to grow your business and plan for the future',
					'modal_content' => <<<HTML
<ul>
	<li>Proactively charge Clients to ensure on-time payment for completed work</li>
	<li>Save billing details for repeat clients to use for future Invoices and Recurring Payments</li>
	<li>Reduce back-and-forth communication with clients and get paid faster</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/enter-cc@1x.png',
				],
			],
			'Managing Your Business'         => [
				'Unlimited Time-Tracking'                  => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Get more work done in less time',
					'modal_content' => <<<HTML
<ul>
	<li>Keep time logged and organized with the in-app (desktop and mobile) time tracker</li>
	<li>Accurately log hours towards a Project or Client, then automatically add them to an Invoice for easy billing — no calculator needed</li>
	<li>Daily, weekly, and monthly breakdowns show you how productive your team is, what work has been completed, and any bottlenecks that need to be fixed</li>
	<li>Use the Chrome web browser extension to track time within Asana, Basecamp, and Trello in a single click</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/4420638338573/Timer.png',
				],
				'Unlimited Expenses'                       => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Easy-to-use expense management tools to run your business better',
					'modal_content' => <<<HTML
<ul>
	<li>Automatically track and record Expenses so you'll always know where your money's going</li>
	<li>Stay on budget with straightforward summaries of your spending by category</li>
	<li>Tax-friendly categories keep your expenses sorted and organized for tax season</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/goodbye-manual-expensing.png',
				],
				'Super-Convenient Mobile Receipt Scanning' => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'The fastest way to log and categorize expenses in your account',
					'modal_content' => <<<HTML
<ul>
	<li>Scan and save paper and digital bills and receipts</li>
	<li>Auto-capture the merchant, line items, totals, and taxes </li>
	<li>Email bills and receipts to your account to capture transactions</li>
	<li>Relax knowing each line item is captured separately</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/expenses-ocr-mobile-3.png',
				],
				'Email Receipts Right to Your Account'     => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Get a receipt through email? Just forward it directly into your account',
					'modal_content' => <<<HTML
<ul>
	<li>Capture any receipt received in your email simply by forwarding it to a dedicated email address</li>
	<li>Merchant, totals, and taxes are automatically scanned</li>
	<li>Use your dedicated email address with vendors for even faster processing</li>
</ul>
HTML,
					'modal_image'   => '',
				],
				'Instantly Capture Every Line Item on Bills' => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Automatically log all details from bills',
					'modal_content' => <<<HTML
<ul>
	<li>Take a photo, upload a file, or forward an email to FreshBooks to capture bills and receipts</li>
	<li>Automatically have each line item of a bill scanned and categorized, waiting for your notes and review</li>
	<li>Automatically capture the merchant, line items, totals, and taxes from each bill</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/expenses-ocr-mobile.png',
				],
				'Automated Bank Import'                    => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Streamline your bookkeeping without lifting a finger',
					'modal_content' => <<<HTML
<ul>
	<li>FreshBooks connects with over 14,000 different banks and credit cards to make tracking, categorizing, and reconciling expenses easier than ever</li>
	<li>Your account automatically updates your transactions daily to give you the most accurate picture of your finances</li>
	<li>Our PCI-compliant software uses the same security encryption as your bank to keep your data safe and secure</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/payments-bank-logos-usa.png.webp',
				],
				'Mobile Mileage Tracking'                  => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Never miss a mileage deduction again',
					'modal_content' => <<<HTML
<ul>
	<li>Automatically log every trip as you drive with our mileage tracker app for iOS and Android</li>
	<li>Save your travel history, categorize business and personal trips, and manually edit trip details so you can claim every expense come tax time</li>
	<li>Review potential deductions and tax-compliant mileage reports from your smartphone or desktop</li>
	<li>Use the mileage tracker with your team for uniform logs and reports that are automatically added to your FreshBooks account</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/product-tour-mileage-tracking-mobileWork-1.png',
				],
				'Tax Time Reports'                         => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Enjoy a stress-free tax season with easy-to-understand reports',
					'modal_content' => <<<HTML
<ul>
	<li>FreshBooks reports are simple enough for you to understand but detailed enough for your accountant to love</li>
	<li>Whip up insightful reports in seconds then save, export, or print them for your accountant, or just give your accountant access to your account</li>
	<li>Keep your revenue, mileage, tax, and expense records all in one place so you can tackle your taxes with ease and confidence</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/reports-total-profit@2x.png.webp',
				],
				'Business Health Reports'                  => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Make confident business decisions with ease',
					'modal_content' => <<<HTML
<ul>
	<li>Analyze the health of your business and make better decisions with real-time financial data and powerful insights</li>
	<li>Balance sheets, profit and loss statements, cash flow statements, and more give a comprehensive view of your finances. </li>
	<li>Export or download reports for accountant use, or just give your accountant access to your account</li>
	<li>Filter records by client, team member, or date for a detailed look at your financial health</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/Carousel-Reports.webp',
				],
				'At-A-Glance Performance Dashboards'       => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'All the essentials for business owners on the go',
					'modal_content' => <<<HTML
<ul>
	<li>Easy-to-read graphs allow you to assess your finances in seconds </li>
	<li>Your dashboard breaks down your profits, expenses, outstanding invoices, and incoming revenue so you know exactly how your business is performing</li>
	<li>Quickly access detailed financial reports when you want to take a deeper dive into your business</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/reports-hero_opt.jpg.webp',
				],
				'Double-Entry Accounting Reports'          => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Intelligent reports that are easy to understand and easier to use',
					'modal_content' => <<<HTML
<ul>
	<li>Automatic checks and balances ensure accuracy and compliance in your reporting</li>
	<li>Industry-standard double-entry accounting tools help you set aside enough for taxes, understand the costs of running your business, and confidently forecast earnings</li>
	<li>Use financial reports to make smarter business decisions and easily work with your accountant</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/tax-time-reports-1.png.webp',
				],
				'Bank Reconciliation'                      => [
					'lite'          => true,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Make organizing transactions a breeze',
					'modal_content' => <<<HTML
<ul>
	<li>FreshBooks automatically scans your bank accounts and matches activity against your financial records for accuracy and consistency</li>
	<li>Your transactions, equity transfers, and refunds are automatically imported and categorized, then added to a summary report for easy export</li>
	<li>Easily approve matching suggestions, or make changes and additions to align them with your business</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/features-bank-rec-1.png.webp',
				],
				'Accountant Access'                        => [
					'lite'          => false,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => "Smart tools to make your accountant's job easier",
					'modal_content' => <<<HTML
<ul>
	<li>Invite your accountant to your FreshBooks account with just a few clicks</li>
	<li>Limit access to the data needed to support your business during tax time or any other time</li>
	<li>Review your books and financial reports with your accountant in real-time so your business continues to run smoothly</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/FvxV9tzg.png',
				],
				'Automatic Expense Receipt Data Capture'   => [
					'lite'          => false,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Organize your expenses in the cloud effortlessly',
					'modal_content' => <<<HTML
<ul>
	<li>No more shoeboxes full of receipts — keep your expenses perfectly organized and preserved for tax season</li>
	<li>Snap a photo or upload a picture of your receipt and FreshBooks automatically captures the merchant, total, and taxes for your review</li>
	<li>Upload receipts in bulk to save time on expense tracking</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/expenses-ocr-mobile-3.png.webp',
				],
				'Automatic Bill Receipt Data Capture'      => [
					'lite'          => false,
					'plus'          => true,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Organized records are just a snap away',
					'modal_content' => <<<HTML
<ul>
	<li>Simply take a picture of your bill and upload it to FreshBooks for perfect preservation every time</li>
	<li>Create new Bills in seconds — no typing needed</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/expenses-ocr-mobile-3.png.webp',
				],
				'Project Profitability'                    => [
					'lite'          => false,
					'plus'          => false,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Make smarter decisions about your work and business',
					'modal_content' => <<<HTML
<ul>
	<li>Easily track project success and team performance with powerful tools and dashboards</li>
	<li>Review how you're spending time and money with in-depth reports to make better decisions on the fly</li>
	<li>Profitability summaries show which services cost you the most so you can lower margins and increase profits</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/Carousel-Projects.webp',
				],
				'Accounts Payable'                         => [
					'lite'          => false,
					'plus'          => false,
					'premium'       => true,
					'select'        => true,
					'modal_heading' => 'Easily manage your bills so you never miss a payment',
					'modal_content' => <<<HTML
<ul>
	<li>Track all your bills in one place for always-on-time payments and stronger relationships with your vendors</li>
	<li>Insightful Profit and Loss and Cash Flow Statements show you where you stand at tax time and beyond</li>
	<li>Snap a picture of a bill and upload it to your account for expense management made simple</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/accounting-ocr.png.webp',
				],
				'2 Team Member Accounts Included'          => [
					'lite'          => false,
					'plus'          => false,
					'premium'       => false,
					'select'        => true,
					'modal_heading' => 'Bring your team on board for better workflows and customer service',
					'modal_content' => <<<HTML
<ul>
	<li>Your FreshBooks account comes with 2 free team member accounts so you can produce better work faster</li>
	<li>Invite Contractors, Employees, or Business Partners for seamless collaboration on client work and projects</li>
	<li>Control what everyone has access to in your account with team permissions</li>
</ul>
HTML,
					'modal_image'   => 'https://www.freshbooks.com/wp-content/uploads/put-people@2x.png.webp',
				],
				'Dedicated Account Manager'                => [
					'lite'          => false,
					'plus'          => false,
					'premium'       => false,
					'select'        => true,
					'modal_heading' => 'Hit the ground running from day one',
					'modal_content' => <<<HTML
<ul>
	<li>Take advantage of our award-winning support for easier account setup and customization</li>
	<li>Get the full onboarding experience with free training for your entire team and data migration from other platforms</li>
	<li>Get resources to help you make your FreshBooks account work harder for you</li>
</ul>
HTML,
					'modal_image'   => '',
				],
				'Customized Onboarding Services'           => [
					'lite'          => false,
					'plus'          => false,
					'premium'       => false,
					'select'        => true,
					'modal_heading' => 'Training designed with your business in mind',
					'modal_content' => <<<HTML
<ul>
	<li>Build a backend experience that works best for your business</li>
	<li>Take advantage of everything that FreshBooks has to offer with the help of your account manager</li>
	<li>Become an expert on your finances with customized training sessions for you and your team</li>
</ul>
HTML,
					'modal_image'   => 'https://staging.web.freshenv.com/wp-content/uploads/e06d32b5.jpg',
				],
				'Data Migration Services'                  => [
					'lite'          => false,
					'plus'          => false,
					'premium'       => false,
					'select'        => true,
					'modal_heading' => 'VIP treatment for your Very Important Pecuniary needs',
					'modal_content' => <<<HTML
<ul>
	<li>Import clients, expenses, items, taxes, and vendors from your old program to your FreshBooks account without lifting a finger</li>
	<li>Transfer existing data from QuickBooks, Xero, and more with no downtime</li>
	<li>We do all the heavy lifting so you can keep running your business as usual</li>
</ul>
HTML,
					'modal_image'   => 'yt:Nk1s3gJr2BQ',
				],
			],
			'Add-ons'                        => [
				'Advanced Payments' => [
					'lite'          => '-',
					'plus'          => '$20/mo',
					'premium'       => '$20/mo',
					'select'        => 'Included',
					'modal_heading' => 'Robust billing for, well…robust billing needs',
					'modal_content' => <<<HTML
<ul>
	<li>Securely accept payments online, in person, and over the phone with our easy-to-use virtual terminal</li>
	<li>Save client credit card details for future invoices so you can stop waiting on payments and regulate your cash flow</li>
	<li>Set up recurring billing profiles and schedule subscription payments for specific clients to take the guesswork out of billing</li>
</ul>
HTML,
					'modal_image'   => 'yt:UE-b9j8dq-A',
				],
				'Team Members'      => [
					'lite'          => '$10/mo',
					'plus'          => '$10/mo',
					'premium'       => '$10/mo',
					'select'        => '$10/mo',
					'modal_heading' => 'Spend less time managing your projects and your people',
					'modal_content' => <<<HTML
<ul>
	<li>Invite the whole team to your account for better collaboration, improved productivity, and fewer mistakes</li>
	<li>Track time, log expenses and mileage, and work with team members and clients — all on one app</li>
	<li>You control what each person has access to, depending on the role you give them</li>
</ul>
HTML,
					'modal_image'   => 'yt:dVbjvhgGPbs',
				],
				'Gusto Payroll'     => [
					'lite'          => '<a href="#">Talk To A Specialist</a>',
					'plus'          => '<a href="#">Talk To A Specialist</a>',
					'premium'       => '<a href="#">Talk To A Specialist</a>',
					'select'        => '<a href="#">Talk To A Specialist</a>',
					'modal_heading' => 'Finally, an integration that works as hard as you do',
					'modal_content' => <<<HTML
<ul>
	<li>Connect your Gusto account to import and track payroll transactions in FreshBooks</li>
	<li>Always up-to-date finances means more accurate expense reports and books</li>
	<li>Automatically categorize Payroll Runs as Expenses and manage them all right from your FreshBooks account</li>
</ul>
HTML,
					'modal_image'   => 'https://support.freshbooks.com/hc/article_attachments/4406752776973/PayrollSection.png',
				],
			],
		],
	];
