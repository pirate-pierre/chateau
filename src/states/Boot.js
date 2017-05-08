/**
 * Setup the pre-game boot sequence.
 */
export default class Boot extends Phaser.State {
  /**
   * Preload any assets needed for the preload state.
   */
  preload() {

  }

  /**
   * Setup anything that is needed before the preload state begins.
   */
  create() {
    // Scale the game to fill the entire page.
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // Don't pause the game on blur.
    this.game.stage.disableVisibilityChange = true;

    // Disable clearing the canvas on each tick (usually not needed).
    this.game.clearBeforeRender = false;

    this.scale.setGameSize(128*9, 128*9);
    this.game.world.setBounds(0, 0, 128*20, 128*20);

    // Move on to the preload state.
    this.game.state.start('Preload');
  }
}
