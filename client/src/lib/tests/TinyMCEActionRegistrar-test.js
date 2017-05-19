/* global jest, jasmine, describe, afterEach, it, expect */

jest.unmock('../TinyMCEActionRegistrar.js');

import TinyMCEActionRegistrar from '../TinyMCEActionRegistrar';

describe('TinyMCEActionRegistrar', () => {
  describe('addCommandWithUrlTest method', () => {
    it('should return the default command when there\'s registered command', () => {
      const cmd = TinyMCEActionRegistrar.getEditorCommandFromUrl('http://googl.come/');
      expect(cmd).toBe('sslinkexternal');
    });

    it('should return the default command when there\'s no matched command', () => {
      TinyMCEActionRegistrar.addCommandWithUrlTest('sslinkemail', /^mailto:/);
      const cmd = TinyMCEActionRegistrar.getEditorCommandFromUrl('[sitetree_link,id=2]');
      expect(cmd).toBe('sslinkexternal');
    });

    it('should a matched command when there is one', () => {
      TinyMCEActionRegistrar.addCommandWithUrlTest('sslinkemail', /^mailto:/);
      TinyMCEActionRegistrar.addCommandWithUrlTest('sslinkfile', /^\[sitetree_link/);

      const cmdFile = TinyMCEActionRegistrar.getEditorCommandFromUrl('[sitetree_link,id=2]');
      expect(cmdFile).toBe('sslinkfile');

      const cmdEmail = TinyMCEActionRegistrar.getEditorCommandFromUrl('mailto:john.doe@test.com');
      expect(cmdEmail).toBe('sslinkemail');

      const cmdExt = TinyMCEActionRegistrar.getEditorCommandFromUrl('http://googl.come/');
      expect(cmdExt).toBe('sslinkexternal');
    });
  });
});
