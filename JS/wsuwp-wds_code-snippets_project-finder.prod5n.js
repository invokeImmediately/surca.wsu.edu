( function ( $ ) {

"use strict";

////////////////////////////////////////////////////////////////////////////////
// §1: Class Declarations


//··//////////////////////////////////////////////////////////////////////////··
//·· §1.1: ProjectFinder

class ProjectFinder {
  // ·> TODO: Implement the actions below through an object-oriented           ·
  // ·  approach.                                                              ·
  // ·  - Check for the project finder interface.                              ·
  // ·  - If found, add the modal cover element to the page.                   ·
  // ·  - Set up the dynamic behaviors of the project viewing buttons.        <·

  constructor( params ) {
    this.selIntf = params.selIntf;
    this.modalTrigger = params.modalTrigger;
    this.abstTrigger = params.abstTrigger;
    this.checkForIntf();
  }

  checkForIntf() {
    this.$abstIntf = $( this.selIntf );
    const proceed = this.$abstIntf.length === 1;
    if ( proceed ) {
      this.initialize();
    }
  }

  initialize() {
    // ·> First, obtain a copy of a reference to the instance that will        ·
    // ·   preserve lexical context in handlers and callbacks.                <·
    const inst = this;

    // ·> Find the column that contains the project finder.                   <·
    this.$intfCol = this.$abstIntf.parents( '.wsu-column' );

    // ·> Create a cover that will be shown when abstract cards are viewed by  ·
    // ·   the user and thus need to behave like a modal.                     <·
    this.$modalCover = $( '<div class="modal-cover"></div>' );
    this.$modalCover.prependTo( this.$intfCol );
    this.$modalCover.on( 'click', function( e ) {
      const $openAbst = $( inst.selIntf + ' .expanded' );
      $openAbst.toggleClass( inst.abstTrigger );
      inst.$modalCover.toggleClass( inst.modalTrigger );
    } );

    // ·> Find all of the title buttons for the project.                      <·
    this.$titleBtns = this.$abstIntf.find( '.project-title' );

    // ·> Attach event handlers to the title buttons so the abstract can be    ·
    // ·  viewed.                                                             <·
    this.$abstIntf.on( 'click', '.project-title', function( e ) {
      const $btn = $( this );
      const $abst = $btn.parent().parent();
      $abst.toggleClass( inst.abstTrigger );
      inst.$modalCover.toggleClass( inst.modalTrigger );
    } );
  }
}

////////////////////////////////////////////////////////////////////////////////
// §2: Function Declarations

//··//////////////////////////////////////////////////////////////////////////··
//·· §2.1: main

function main() {
  $( function () {
    setUpProjectFinder( {
      selIntf: '.abst-intf',
      modalTrigger: 'engaged',
      abstTrigger: 'expanded'
    } );

    setUpProjectFinder( {
      selIntf: '.abst-intf-2022',
      modalTrigger: 'engaged',
      abstTrigger: 'expanded'
    } );
  } );
}

//··//////////////////////////////////////////////////////////////////////////··
//·· §2.2: setUpProjectFinder

/**
 * Look for and set up the project finder interface on SURCA website pages as
 *  needed.
 *
 * @param {object} params - Simple object contained arguments for the function.
 * @param {string} params.selIntf - A selector string that can be used by
 *  jQuery to fetch the element representing the container of the project
 *  finder.
 */
function setUpProjectFinder( params ) {
  const projFinder = new ProjectFinder( params );
}

//··//////////////////////////////////////////////////////////////////////////··
//·· §3: Execution entry point

main();

} )( jQuery );
