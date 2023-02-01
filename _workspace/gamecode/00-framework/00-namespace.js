/**
 * As part of my various refactors, I ended up introducing a bunch of
 * global namespace-esk variables.
 *
 * Having a single spot to document them makes sense. By convention,
 * if you need to make a new top-level namespace, declare it here.
 */

/**
 * Declare everything in a root namespace, so that things can still be found
 * if shadowed, and for "documentation" purposes
 */

Object.defineProperties(window.game, {
	State: { value: State },
	setup: { value: setup },
	Wikifier: { value: Wikifier },
});

game.Errors = {};
game.Perflog = {};

defineGlobalNamespaces(window.game);
