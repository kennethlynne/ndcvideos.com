'use strict';
angular.module('ngRoles', [])
  .provider('ngRoles', function () {

    var APP_ROLE_SEPARATOR = ".";

    this.setSeparator = function (sep) {
      APP_ROLE_SEPARATOR = sep;
      return this;
    };

    this.$get = ['$rootScope', '$log', function ngRoles($rootScope, $log) {
      // VARIABLES
      var applications = {},
        profiles = {},
        users = {};

      // Application
      function Application(name, roles) {
        this.name = name;
        this.roles = [];

        if (roles && roles.length) {
          this.addRoles.apply(this, roles);
        }
      }

      Application.prototype.addRoles = function () {
        for (var i = 0; i < arguments.length; i++) {
          if (this.roles.indexOf(arguments[i]) == -1) {
            this.roles.push(arguments[i]);

            $rootScope.$emit(this.name + ".role.add", arguments[i]);
          }
        }
        return this;
      };
      Application.prototype.removeRoles = function () {
        for (var i = 0; i < arguments.length; i++) {
          if (this.roles.indexOf(arguments[i]) != -1) {
            this.roles.splice(this.roles.indexOf(arguments[i]), 1);

            $rootScope.$emit(this.name + ".role.del", arguments[i]);
          }
        }
        return this;
      };

      // Profile
      function Profile(name, roles) {
        this.name = name;
        this.roles = [];
        this.applications = [];
        this.listeners = {};

        if (roles && roles.length) {
          this.addRoles.apply(this, roles);
        }
      }

      Profile.prototype.addRoles = function () {
        for (var i = 0; i < arguments.length; i++) {
          var role = arguments[i];

          if (role.indexOf(APP_ROLE_SEPARATOR) <= 0) {
            throw new Error("A role must have an associated application");
          }

          role = role.split(APP_ROLE_SEPARATOR, 2);

          if (!applications.hasOwnProperty(role[0])) {
            throw new Error("Application not found");
          }

          if (role[1] == "*") {
            for (var j = 0; j < applications[role[0]].roles.length; j++) {
              this.__addRole(role[0], applications[role[0]].roles[j]);
            }

            if (this.applications.indexOf(role[0]) == -1) {
              this.listeners[role[0] + ".role.add"] = $rootScope.$on(role[0] + ".role.add", this.__watchNewRoles(this, role[0]));
              this.listeners[role[0] + ".role.del"] = $rootScope.$on(role[0] + ".role.del", this.__watchRemoveRoles(this, role[0]));

              this.applications.push(role[0]);
            }
          } else {
            if (applications[role[0]].roles.indexOf(role[1]) == -1) {
              throw new Error("Application " + role[0] + " does not have " + role[1] + " role");
            }

            this.__addRole(role[0], role[1]);
          }
        }
        return this;
      };
      Profile.prototype.removeRoles = function () {
        for (var i = 0; i < arguments.length; i++) {
          var role = arguments[i];

          if (role.indexOf(APP_ROLE_SEPARATOR) <= 0) {
            throw new Error("A role must have an associated application");
          }

          role = role.split(APP_ROLE_SEPARATOR, 2);

          if (!applications.hasOwnProperty(role[0])) {
            throw new Error("Application not found");
          }

          if (role[1] == "*") {
            for (var j = 0; j < applications[role[0]].roles.length; j++) {
              this.__removeRole(role[0], applications[role[0]].roles[j]);
            }

            if (this.applications.indexOf(role[0]) != -1) {
              this.listeners[role[0] + ".role.add"]();
              this.listeners[role[0] + ".role.del"]();

              this.applications.splice(this.applications.indexOf(role[0]), 1);
            }
          } else {
            if (applications[role[0]].roles.indexOf(role[1]) == -1) {
              throw new Error("Application " + role[0] + " does not have " + role[1] + " role");
            }

            this.__removeRole(role[0], role[1]);
          }
        }

        return this;
      };
      Profile.prototype.hasRoles = function () {
        for (var i = 0; i < arguments.length; i++) {
          var role = arguments[i];

          if (role.indexOf(APP_ROLE_SEPARATOR) <= 0) return false;

          role = role.split(APP_ROLE_SEPARATOR, 2);

          if (!applications.hasOwnProperty(role[0])) return false;

          if (role[1] == "*") {
            for (var j = 0; j < applications[role[0]].roles.length; j++) {
              if (this.roles.indexOf(role[0] + APP_ROLE_SEPARATOR + applications[role[0]].roles[j]) == -1) return false;
            }
          } else {
            if (applications[role[0]].roles.indexOf(role[1]) == -1) {
              try {
                throw new Error("Application " + role[0] + " does not have " + role[1] + " role");
              } catch (err) {
                $log.error(err.message);
              }
            }
            if (this.roles.indexOf(role.join(APP_ROLE_SEPARATOR)) == -1) return false;
          }
        }

        return true;
      };
      Profile.prototype.hasAnyRoles = function () {
        for (var i = 0; i < arguments.length; i++) {
          var role = arguments[i];

          if (role.indexOf(APP_ROLE_SEPARATOR) <= 0) continue;

          role = role.split(APP_ROLE_SEPARATOR, 2);

          if (!applications.hasOwnProperty(role[0])) continue;

          if (role[1] == "*") {
            for (var j = 0; j < applications[role[0]].roles.length; j++) {
              if (this.roles.indexOf(role[0] + APP_ROLE_SEPARATOR + applications[role[0]].roles[j]) != -1) return true;
            }
          } else {
            if (applications[role[0]].roles.indexOf(role[1]) == -1) {
              try {
                throw new Error("Application " + role[0] + " does not have " + role[1] + " role");
              } catch (err) {
                $log.log(err.message)
              }
            }
            if (this.roles.indexOf(role.join(APP_ROLE_SEPARATOR)) != -1) return true;
          }
        }

        return false;
      };
      Profile.prototype.__addRole = function (app, role) {
        var app_role = app + APP_ROLE_SEPARATOR + role;

        if (this.roles.indexOf(app_role) == -1) {
          this.roles.push(app_role);
          $rootScope.$emit(this.name + "profile.addrole", role);
        }
      };
      Profile.prototype.__removeRole = function (app, role) {
        var app_role = app + APP_ROLE_SEPARATOR + role;

        if (this.roles.indexOf(app_role) != -1) {
          this.roles.splice(this.roles.indexOf(app_role), 1);
          $rootScope.$emit(this.name + "profile.delrole", arguments[i]);
        }
      };
      Profile.prototype.__watchNewRoles = function (profile, app) {
        return function (event, role) {
          var app_role = app + APP_ROLE_SEPARATOR + role;
          if (profile.roles.indexOf(app_role) == -1) {
            profile.roles.push(app_role);
            $log.log(app_role + ' role added to ' + profile.name + ' profile because it\'s own all ' + app + ' roles.');
          }
        };
      };
      Profile.prototype.__watchRemoveRoles = function (profile, app) {
        return function (event, role) {
          var app_role = app + APP_ROLE_SEPARATOR + role;
          if (profile.roles.indexOf(app_role) != -1) {
            profile.roles.splice(profile.roles.indexOf(app_role), 1);
            $log.log(app_role + ' role removed from ' + profile.name + ' profile because it\'s own all ' + app + ' roles only.');
          }
        };
      };

      // FUNCTIONS
      function getApplication(name) {
        if (applications.hasOwnProperty(name)) {
          return applications[name];
        }
        return null;
      }

      function getProfile(name) {
        if (profiles.hasOwnProperty(name)) {
          return profiles[name];
        }
        return null;
      }

      function addApplication(name, roles) {
        var app = getApplication(name);

        if (app === null) {
          applications[name] = new Application(name, roles);
        } else if (roles && roles.length) {
          applications[name].addRoles.apply(applications[name], roles);
        }

        if (!self.hasOwnProperty(name)) {
          self[name] = applications[name];
        }

        return applications[name];
      }

      function addProfile(name, roles) {
        var profile = getProfile(name);

        if (profile === null) {
          profiles[name] = new Profile(name, roles);
        } else if (roles && roles.length) {
          profiles[name].addRoles.apply(profiles[name], roles);
        }

        if (!self.hasOwnProperty(name)) {
          self[name] = profiles[name];
        }

        return profiles[name];
      }

      function exportRoles() {
        var a = {}, p = {};

        for (var app in applications) {
          if (applications.hasOwnProperty(app)) {
            a[app] = [];

            for (var i = 0; i < applications[app].roles.length; i++) {
              a[app].push(applications[app].roles[i]);
            }
          }
        }
        for (var prof in profiles) {
          if (profiles.hasOwnProperty(prof)) {
            p[prof] = [];

            for (var i = 0; i < profiles[prof].roles.length; i++) {
              p[prof].push(profiles[prof].roles[i]);
            }
          }
        }
        return {
          applications: a,
          profiles: p
        };
      }

      function importRoles(data) {
        applications = {};
        profiles = {};

        for (var app in data.applications) {
          if (data.applications.hasOwnProperty(app)) {
            applications[app] = new Application(app);
            applications[app].addRoles.apply(applications[app], data.applications[app]);
          }
        }
        for (var prof in data.profiles) {
          if (data.profiles.hasOwnProperty(prof)) {
            profiles[prof] = new Profile(prof);
            profiles[prof].addRoles.apply(profiles[prof], data.profiles[prof]);
          }
        }
      }

      return {
        addApplication: addApplication,
        addProfile: addProfile,
        getApplication: getApplication,
        getProfile: getProfile,
        import: importRoles,
        export: exportRoles
      };
    }];
  });