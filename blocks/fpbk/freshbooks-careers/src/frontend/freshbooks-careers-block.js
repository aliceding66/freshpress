/**
 * Freshbooks Careers.
 */

import { initBlock } from 'scripts/helpers/_blocks';

const getDepartments = ( block ) => {
	const departmentsSelect = block.querySelector( '#departments' );

	// eslint-disable-next-line no-undef
	fetch( 'https://api.greenhouse.io/v1/boards/freshbooks/departments?render_as=tree' )
		.then( ( response ) => response.json() )
		.then( ( response ) => {
			const departments = response.departments.filter(
				( department ) =>
					department.jobs.length ||
					department.children.some( ( child ) => child.jobs.length )
			);

			departments.forEach( ( department ) => {
				departmentsSelect.innerHTML += `<option value="${ department.id }">${ department.name }</option>`;

				if ( department.children ) {
					department.children.forEach( ( departmentChild ) => {
						if ( departmentChild.jobs.length ) {
							departmentsSelect.innerHTML += `<option value="${ departmentChild.id }">- ${ departmentChild.name }</option>`;
						}
					} );
				}
			} );
		} );
};

const getLocations = ( block ) => {
	const locationsSelect = block.querySelector( '#locations' );

	// eslint-disable-next-line no-undef
	fetch( 'https://api.greenhouse.io/v1/boards/freshbooks/jobs' )
		.then( ( response ) => response.json() )
		.then( ( response ) => {
			const locations = [ ...new Set( response.jobs.map( ( job ) => job.location.name ) ) ];
			locations.forEach( ( location ) => {
				locationsSelect.innerHTML += `<option value="${ location }">${ location }</option>`;
			} );
		} );
};

const goToPage = ( block, newPage ) => {
	const paginationButtons = block.querySelectorAll( 'li' );
	const buttonToHighlight = block.querySelector( `li[data-page="${ newPage }"]` );
	const arrowLeft = block.querySelector( '#nav-arrow-left' );
	const arrowRight = block.querySelector( '#nav-arrow-right' );
	paginationButtons.forEach( ( btn ) => btn.classList.remove( 'active' ) );
	buttonToHighlight.classList.add( 'active' );

	if ( newPage === 1 ) {
		arrowLeft.classList.remove( 'active' );
		arrowRight.classList.add( 'active' );
	} else if ( newPage === block.careers.paginationLength ) {
		arrowRight.classList.remove( 'active' );
		arrowLeft.classList.add( 'active' );
	} else {
		arrowLeft.classList.add( 'active' );
		arrowRight.classList.add( 'active' );
	}
	block.careers.page = newPage;

	populateJobs(
		block,
		block.careers.jobs,
		block.careers.department,
		block.careers.location,
		newPage
	);
};

const handleArrows = ( block ) => {
	const arrowLeft = block.querySelector( '#nav-arrow-left' );
	const arrowRight = block.querySelector( '#nav-arrow-right' );
	arrowLeft.addEventListener( 'click', () => {
		if ( block.careers.page > 1 && arrowLeft.classList.contains( 'active' ) ) {
			goToPage( block, block.careers.page - 1 );
		} else {
			arrowLeft.classList.remove( 'active' );
		}
	} );

	arrowRight.addEventListener( 'click', () => {
		if (
			block.careers.page < block.careers.paginationLength &&
			arrowRight.classList.contains( 'active' )
		) {
			goToPage( block, block.careers.page + 1 );
		} else {
			arrowRight.classList.remove( 'active' );
		}
	} );
};

const populatePagination = ( block, paginationLength = 1, page ) => {
	const paginationContainer = block.querySelector( '#pagination' );
	const arrowRight = block.querySelector( '#nav-arrow-right' );
	let buttons = null;
	paginationContainer.innerHTML = '';
	block.careers.paginationLength = paginationLength;

	if ( block.careers.paginationLength < 2 ) {
		arrowRight.classList.remove( 'active' );
		paginationContainer.innerHTML += `
			<li data-page="1" class="freshbooks-careers__page mx-1 d-flex justify-content-center align-items-center active">1</li>
		`;
	} else {
		for ( let i = 1; i <= paginationLength; i++ ) {
			paginationContainer.innerHTML += `
			<li data-page="${ i }" class="freshbooks-careers__page mx-1 d-flex justify-content-center align-items-center">
				${ i }
			</li>
		`;
		}

		if ( block.careers.paginationLength !== block.careers.page ) {
			arrowRight.classList.add( 'active' );
		}
	}

	buttons = paginationContainer.querySelectorAll( 'li' );
	buttons[ page - 1 ].classList.add( 'active' );

	buttons.forEach( ( button ) => {
		button.addEventListener( 'click', () => {
			const selectedPage = parseInt( button.dataset.page );
			goToPage( block, selectedPage, buttons, block.careers.paginationLength );
		} );
	} );
};

const populateJobs = ( block, jobs, department = '', location = '', page = 1 ) => {
	const jobsContainer = block.querySelector( '#jobs' );
	const loader = block.querySelector( '#loader' );
	let filteredJobsLength = 0;

	jobsContainer.innerHTML = '';

	if ( jobs ) {
		if ( department !== '' ) {
			jobs = jobs.filter( ( job ) =>
				[
					parseInt( job.departments[ 0 ].id ),
					parseInt( job.departments[ 0 ].parent_id ),
				].includes( parseInt( department ) )
			);
		}

		if ( location !== '' ) {
			jobs = jobs.filter( ( job ) => job.location.name === location );
		}

		filteredJobsLength = jobs.length;
		jobs = jobs.slice( ( page - 1 ) * 8, ( page - 1 ) * 8 + 8 );

		if ( jobs.length ) {
			jobs.forEach( ( job ) => {
				jobsContainer.innerHTML += `
			<a href="${ job.absolute_url }" class="freshbooks-careers__item d-flex flex-wrap text-decoration-none" data-id="${ job.id }" data-location="${ job.location.name }">
				<h4 class="freshbooks-careers__item-text freshbooks-careers__item-text_title d-block pr-5 pr-sm-3">${ job.title }</h4>
				<span class="freshbooks-careers__item-text freshbooks-careers__item-department d-flex align-items-center pr-5 pr-sm-3">${ job.departments[ 0 ].name }</span>
				<span class="freshbooks-careers__item-text freshbooks-careers__item-location d-flex align-items-center pr-5 pr-sm-3">${ job.location.name }</span>
			</a>
		`;
			} );
		} else {
			loader.classList.remove( 'd-block' );
			jobsContainer.innerHTML = `<div class="d-flex mt-5 mb-n3 justify-content-center font-weight-medium">No jobs found</div>`;
		}
		populatePagination( block, Math.ceil( filteredJobsLength / 8 ), page );
	}
};

const getJobs = ( block ) => {
	const jobsContainer = block.querySelector( '#jobs' );
	const loader = block.querySelector( '#loader' );
	const departmentsSelect = block.querySelector( '#departments' );
	const locationsSelect = block.querySelector( '#locations' );

	block.careers.department = departmentsSelect.value;
	block.careers.location = locationsSelect.value;
	block.careers.page = 1;

	jobsContainer.innerHTML = '';
	loader.classList.add( 'd-block' );

	if ( block.careers.jobs ) {
		populateJobs(
			block,
			block.careers.jobs,
			block.careers.department,
			block.careers.location,
			block.careers.page
		);
		loader.classList.remove( 'd-block' );
	} else {
		// eslint-disable-next-line no-undef
		fetch( 'https://api.greenhouse.io/v1/boards/freshbooks/jobs?content=true' )
			.then( ( response ) => response.json() )
			.then( ( response ) => {
				block.careers.jobs = response.jobs;

				populateJobs(
					block,
					block.careers.jobs,
					block.careers.department,
					block.careers.location,
					block.careers.page
				);
				loader.classList.remove( 'd-block' );
			} );
	}
};

const initFreshbooksCareers = ( freshbooksCareers ) => {
	const departmentsSelect = freshbooksCareers.querySelector( '#departments' );
	const locationsSelect = freshbooksCareers.querySelector( '#locations' );

	freshbooksCareers.careers = {};

	getDepartments( freshbooksCareers );
	getLocations( freshbooksCareers );
	populateJobs( freshbooksCareers );
	handleArrows( freshbooksCareers );

	locationsSelect.addEventListener( 'change', () => {
		getJobs( freshbooksCareers );
	} );

	departmentsSelect.addEventListener( 'change', () => {
		getJobs( freshbooksCareers );
	} );

	getJobs( freshbooksCareers );
};

initBlock( '.freshbooks-careers', initFreshbooksCareers );
