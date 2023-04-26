var Ie = Object.defineProperty;
var je = (n, e, t) => e in n ? Ie(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var p = (n, e, t) => (je(n, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as g, reactive as qe, openBlock as d, createBlock as V, ref as q, watchEffect as Pe, createElementBlock as _, createElementVNode as u, Fragment as F, renderList as M, normalizeClass as ye, createTextVNode as Ae, toDisplayString as P, createVNode as A, onMounted as Ce, computed as Ne, KeepAlive as De, resolveDynamicComponent as $e, unref as O, createApp as Ue } from "vue";
function w(n) {
  return typeof n == "function";
}
function Ve(n) {
  return w(n == null ? void 0 : n.lift);
}
function Re(n) {
  return function(e) {
    if (Ve(e))
      return e.lift(function(t) {
        try {
          return n(t, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
var Y = function(n, e) {
  return Y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var o in r)
      Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
  }, Y(n, e);
};
function x(n, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  Y(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
function G(n) {
  var e = typeof Symbol == "function" && Symbol.iterator, t = e && n[e], r = 0;
  if (t)
    return t.call(n);
  if (n && typeof n.length == "number")
    return {
      next: function() {
        return n && r >= n.length && (n = void 0), { value: n && n[r++], done: !n };
      }
    };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function R(n, e) {
  var t = typeof Symbol == "function" && n[Symbol.iterator];
  if (!t)
    return n;
  var r = t.call(n), o, s = [], i;
  try {
    for (; (e === void 0 || e-- > 0) && !(o = r.next()).done; )
      s.push(o.value);
  } catch (c) {
    i = { error: c };
  } finally {
    try {
      o && !o.done && (t = r.return) && t.call(r);
    } finally {
      if (i)
        throw i.error;
    }
  }
  return s;
}
function B(n, e, t) {
  if (t || arguments.length === 2)
    for (var r = 0, o = e.length, s; r < o; r++)
      (s || !(r in e)) && (s || (s = Array.prototype.slice.call(e, 0, r)), s[r] = e[r]);
  return n.concat(s || Array.prototype.slice.call(e));
}
function me(n) {
  var e = function(r) {
    Error.call(r), r.stack = new Error().stack;
  }, t = n(e);
  return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
var L = me(function(n) {
  return function(t) {
    n(this), this.message = t ? t.length + ` errors occurred during unsubscription:
` + t.map(function(r, o) {
      return o + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = t;
  };
});
function X(n, e) {
  if (n) {
    var t = n.indexOf(e);
    0 <= t && n.splice(t, 1);
  }
}
var W = function() {
  function n(e) {
    this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return n.prototype.unsubscribe = function() {
    var e, t, r, o, s;
    if (!this.closed) {
      this.closed = !0;
      var i = this._parentage;
      if (i)
        if (this._parentage = null, Array.isArray(i))
          try {
            for (var c = G(i), l = c.next(); !l.done; l = c.next()) {
              var a = l.value;
              a.remove(this);
            }
          } catch (m) {
            e = { error: m };
          } finally {
            try {
              l && !l.done && (t = c.return) && t.call(c);
            } finally {
              if (e)
                throw e.error;
            }
          }
        else
          i.remove(this);
      var h = this.initialTeardown;
      if (w(h))
        try {
          h();
        } catch (m) {
          s = m instanceof L ? m.errors : [m];
        }
      var b = this._finalizers;
      if (b) {
        this._finalizers = null;
        try {
          for (var E = G(b), k = E.next(); !k.done; k = E.next()) {
            var C = k.value;
            try {
              se(C);
            } catch (m) {
              s = s != null ? s : [], m instanceof L ? s = B(B([], R(s)), R(m.errors)) : s.push(m);
            }
          }
        } catch (m) {
          r = { error: m };
        } finally {
          try {
            k && !k.done && (o = E.return) && o.call(E);
          } finally {
            if (r)
              throw r.error;
          }
        }
      }
      if (s)
        throw new L(s);
    }
  }, n.prototype.add = function(e) {
    var t;
    if (e && e !== this)
      if (this.closed)
        se(e);
      else {
        if (e instanceof n) {
          if (e.closed || e._hasParent(this))
            return;
          e._addParent(this);
        }
        (this._finalizers = (t = this._finalizers) !== null && t !== void 0 ? t : []).push(e);
      }
  }, n.prototype._hasParent = function(e) {
    var t = this._parentage;
    return t === e || Array.isArray(t) && t.includes(e);
  }, n.prototype._addParent = function(e) {
    var t = this._parentage;
    this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
  }, n.prototype._removeParent = function(e) {
    var t = this._parentage;
    t === e ? this._parentage = null : Array.isArray(t) && X(t, e);
  }, n.prototype.remove = function(e) {
    var t = this._finalizers;
    t && X(t, e), e instanceof n && e._removeParent(this);
  }, n.EMPTY = function() {
    var e = new n();
    return e.closed = !0, e;
  }(), n;
}(), ge = W.EMPTY;
function we(n) {
  return n instanceof W || n && "closed" in n && w(n.remove) && w(n.add) && w(n.unsubscribe);
}
function se(n) {
  w(n) ? n() : n.unsubscribe();
}
var te = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, J = {
  setTimeout: function(n, e) {
    for (var t = [], r = 2; r < arguments.length; r++)
      t[r - 2] = arguments[r];
    var o = J.delegate;
    return o != null && o.setTimeout ? o.setTimeout.apply(o, B([n, e], R(t))) : setTimeout.apply(void 0, B([n, e], R(t)));
  },
  clearTimeout: function(n) {
    var e = J.delegate;
    return ((e == null ? void 0 : e.clearTimeout) || clearTimeout)(n);
  },
  delegate: void 0
};
function Be(n) {
  J.setTimeout(function() {
    throw n;
  });
}
function ie() {
}
var N = null;
function $(n) {
  if (te.useDeprecatedSynchronousErrorHandling) {
    var e = !N;
    if (e && (N = { errorThrown: !1, error: null }), n(), e) {
      var t = N, r = t.errorThrown, o = t.error;
      if (N = null, r)
        throw o;
    }
  } else
    n();
}
var ne = function(n) {
  x(e, n);
  function e(t) {
    var r = n.call(this) || this;
    return r.isStopped = !1, t ? (r.destination = t, we(t) && t.add(r)) : r.destination = ze, r;
  }
  return e.create = function(t, r, o) {
    return new K(t, r, o);
  }, e.prototype.next = function(t) {
    this.isStopped || this._next(t);
  }, e.prototype.error = function(t) {
    this.isStopped || (this.isStopped = !0, this._error(t));
  }, e.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, e.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, n.prototype.unsubscribe.call(this), this.destination = null);
  }, e.prototype._next = function(t) {
    this.destination.next(t);
  }, e.prototype._error = function(t) {
    try {
      this.destination.error(t);
    } finally {
      this.unsubscribe();
    }
  }, e.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, e;
}(W), Fe = Function.prototype.bind;
function H(n, e) {
  return Fe.call(n, e);
}
var Me = function() {
  function n(e) {
    this.partialObserver = e;
  }
  return n.prototype.next = function(e) {
    var t = this.partialObserver;
    if (t.next)
      try {
        t.next(e);
      } catch (r) {
        D(r);
      }
  }, n.prototype.error = function(e) {
    var t = this.partialObserver;
    if (t.error)
      try {
        t.error(e);
      } catch (r) {
        D(r);
      }
    else
      D(e);
  }, n.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete)
      try {
        e.complete();
      } catch (t) {
        D(t);
      }
  }, n;
}(), K = function(n) {
  x(e, n);
  function e(t, r, o) {
    var s = n.call(this) || this, i;
    if (w(t) || !t)
      i = {
        next: t != null ? t : void 0,
        error: r != null ? r : void 0,
        complete: o != null ? o : void 0
      };
    else {
      var c;
      s && te.useDeprecatedNextContext ? (c = Object.create(t), c.unsubscribe = function() {
        return s.unsubscribe();
      }, i = {
        next: t.next && H(t.next, c),
        error: t.error && H(t.error, c),
        complete: t.complete && H(t.complete, c)
      }) : i = t;
    }
    return s.destination = new Me(i), s;
  }
  return e;
}(ne);
function D(n) {
  Be(n);
}
function We(n) {
  throw n;
}
var ze = {
  closed: !0,
  next: ie,
  error: We,
  complete: ie
}, Le = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function He(n) {
  return n;
}
function Qe(n) {
  return n.length === 0 ? He : n.length === 1 ? n[0] : function(t) {
    return n.reduce(function(r, o) {
      return o(r);
    }, t);
  };
}
var ce = function() {
  function n(e) {
    e && (this._subscribe = e);
  }
  return n.prototype.lift = function(e) {
    var t = new n();
    return t.source = this, t.operator = e, t;
  }, n.prototype.subscribe = function(e, t, r) {
    var o = this, s = Ge(e) ? e : new K(e, t, r);
    return $(function() {
      var i = o, c = i.operator, l = i.source;
      s.add(c ? c.call(s, l) : l ? o._subscribe(s) : o._trySubscribe(s));
    }), s;
  }, n.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (t) {
      e.error(t);
    }
  }, n.prototype.forEach = function(e, t) {
    var r = this;
    return t = ue(t), new t(function(o, s) {
      var i = new K({
        next: function(c) {
          try {
            e(c);
          } catch (l) {
            s(l), i.unsubscribe();
          }
        },
        error: s,
        complete: o
      });
      r.subscribe(i);
    });
  }, n.prototype._subscribe = function(e) {
    var t;
    return (t = this.source) === null || t === void 0 ? void 0 : t.subscribe(e);
  }, n.prototype[Le] = function() {
    return this;
  }, n.prototype.pipe = function() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    return Qe(e)(this);
  }, n.prototype.toPromise = function(e) {
    var t = this;
    return e = ue(e), new e(function(r, o) {
      var s;
      t.subscribe(function(i) {
        return s = i;
      }, function(i) {
        return o(i);
      }, function() {
        return r(s);
      });
    });
  }, n.create = function(e) {
    return new n(e);
  }, n;
}();
function ue(n) {
  var e;
  return (e = n != null ? n : te.Promise) !== null && e !== void 0 ? e : Promise;
}
function Ye(n) {
  return n && w(n.next) && w(n.error) && w(n.complete);
}
function Ge(n) {
  return n && n instanceof ne || Ye(n) && we(n);
}
function Xe(n, e, t, r, o) {
  return new Je(n, e, t, r, o);
}
var Je = function(n) {
  x(e, n);
  function e(t, r, o, s, i, c) {
    var l = n.call(this, t) || this;
    return l.onFinalize = i, l.shouldUnsubscribe = c, l._next = r ? function(a) {
      try {
        r(a);
      } catch (h) {
        t.error(h);
      }
    } : n.prototype._next, l._error = s ? function(a) {
      try {
        s(a);
      } catch (h) {
        t.error(h);
      } finally {
        this.unsubscribe();
      }
    } : n.prototype._error, l._complete = o ? function() {
      try {
        o();
      } catch (a) {
        t.error(a);
      } finally {
        this.unsubscribe();
      }
    } : n.prototype._complete, l;
  }
  return e.prototype.unsubscribe = function() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var r = this.closed;
      n.prototype.unsubscribe.call(this), !r && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    }
  }, e;
}(ne), Se = {
  now: function() {
    return (Se.delegate || Date).now();
  },
  delegate: void 0
}, Ke = me(function(n) {
  return function() {
    n(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), re = function(n) {
  x(e, n);
  function e() {
    var t = n.call(this) || this;
    return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
  }
  return e.prototype.lift = function(t) {
    var r = new ae(this, this);
    return r.operator = t, r;
  }, e.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Ke();
  }, e.prototype.next = function(t) {
    var r = this;
    $(function() {
      var o, s;
      if (r._throwIfClosed(), !r.isStopped) {
        r.currentObservers || (r.currentObservers = Array.from(r.observers));
        try {
          for (var i = G(r.currentObservers), c = i.next(); !c.done; c = i.next()) {
            var l = c.value;
            l.next(t);
          }
        } catch (a) {
          o = { error: a };
        } finally {
          try {
            c && !c.done && (s = i.return) && s.call(i);
          } finally {
            if (o)
              throw o.error;
          }
        }
      }
    });
  }, e.prototype.error = function(t) {
    var r = this;
    $(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.hasError = r.isStopped = !0, r.thrownError = t;
        for (var o = r.observers; o.length; )
          o.shift().error(t);
      }
    });
  }, e.prototype.complete = function() {
    var t = this;
    $(function() {
      if (t._throwIfClosed(), !t.isStopped) {
        t.isStopped = !0;
        for (var r = t.observers; r.length; )
          r.shift().complete();
      }
    });
  }, e.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(e.prototype, "observed", {
    get: function() {
      var t;
      return ((t = this.observers) === null || t === void 0 ? void 0 : t.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._trySubscribe = function(t) {
    return this._throwIfClosed(), n.prototype._trySubscribe.call(this, t);
  }, e.prototype._subscribe = function(t) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t);
  }, e.prototype._innerSubscribe = function(t) {
    var r = this, o = this, s = o.hasError, i = o.isStopped, c = o.observers;
    return s || i ? ge : (this.currentObservers = null, c.push(t), new W(function() {
      r.currentObservers = null, X(c, t);
    }));
  }, e.prototype._checkFinalizedStatuses = function(t) {
    var r = this, o = r.hasError, s = r.thrownError, i = r.isStopped;
    o ? t.error(s) : i && t.complete();
  }, e.prototype.asObservable = function() {
    var t = new ce();
    return t.source = this, t;
  }, e.create = function(t, r) {
    return new ae(t, r);
  }, e;
}(ce), ae = function(n) {
  x(e, n);
  function e(t, r) {
    var o = n.call(this) || this;
    return o.destination = t, o.source = r, o;
  }
  return e.prototype.next = function(t) {
    var r, o;
    (o = (r = this.destination) === null || r === void 0 ? void 0 : r.next) === null || o === void 0 || o.call(r, t);
  }, e.prototype.error = function(t) {
    var r, o;
    (o = (r = this.destination) === null || r === void 0 ? void 0 : r.error) === null || o === void 0 || o.call(r, t);
  }, e.prototype.complete = function() {
    var t, r;
    (r = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null || r === void 0 || r.call(t);
  }, e.prototype._subscribe = function(t) {
    var r, o;
    return (o = (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(t)) !== null && o !== void 0 ? o : ge;
  }, e;
}(re), Ze = function(n) {
  x(e, n);
  function e(t) {
    var r = n.call(this) || this;
    return r._value = t, r;
  }
  return Object.defineProperty(e.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._subscribe = function(t) {
    var r = n.prototype._subscribe.call(this, t);
    return !r.closed && t.next(this._value), r;
  }, e.prototype.getValue = function() {
    var t = this, r = t.hasError, o = t.thrownError, s = t._value;
    if (r)
      throw o;
    return this._throwIfClosed(), s;
  }, e.prototype.next = function(t) {
    n.prototype.next.call(this, this._value = t);
  }, e;
}(re), Q = function(n) {
  x(e, n);
  function e(t, r, o) {
    t === void 0 && (t = 1 / 0), r === void 0 && (r = 1 / 0), o === void 0 && (o = Se);
    var s = n.call(this) || this;
    return s._bufferSize = t, s._windowTime = r, s._timestampProvider = o, s._buffer = [], s._infiniteTimeWindow = !0, s._infiniteTimeWindow = r === 1 / 0, s._bufferSize = Math.max(1, t), s._windowTime = Math.max(1, r), s;
  }
  return e.prototype.next = function(t) {
    var r = this, o = r.isStopped, s = r._buffer, i = r._infiniteTimeWindow, c = r._timestampProvider, l = r._windowTime;
    o || (s.push(t), !i && s.push(c.now() + l)), this._trimBuffer(), n.prototype.next.call(this, t);
  }, e.prototype._subscribe = function(t) {
    this._throwIfClosed(), this._trimBuffer();
    for (var r = this._innerSubscribe(t), o = this, s = o._infiniteTimeWindow, i = o._buffer, c = i.slice(), l = 0; l < c.length && !t.closed; l += s ? 1 : 2)
      t.next(c[l]);
    return this._checkFinalizedStatuses(t), r;
  }, e.prototype._trimBuffer = function() {
    var t = this, r = t._bufferSize, o = t._timestampProvider, s = t._buffer, i = t._infiniteTimeWindow, c = (i ? 1 : 2) * r;
    if (r < 1 / 0 && c < s.length && s.splice(0, s.length - c), !i) {
      for (var l = o.now(), a = 0, h = 1; h < s.length && s[h] <= l; h += 2)
        a = h;
      a && s.splice(0, a + 1);
    }
  }, e;
}(re);
function et(n) {
  return Re(function(e, t) {
    var r = !1, o = 0;
    e.subscribe(Xe(t, function(s) {
      return (r || (r = !n(s, o++))) && t.next(s);
    }));
  });
}
function tt(n, e, t, r) {
  y.innerUse("devtool").publish(t);
}
function nt(n = !1) {
  return function(t, r, o, s) {
    return t[r] !== o && tt(t, r, o), Reflect.set(t, r, o, s);
  };
}
const le = {
  get: function(n, e, t) {
    return n[e];
  },
  set: nt()
}, fe = Symbol("channelx");
function rt(n) {
  return ot(n);
}
function ot(n) {
  return n[fe] = {
    queues: he({}, le),
    emitters: he({}, le),
    innerQueues: {},
    exchanges: []
  }, n[fe];
}
function he(n, e) {
  return new Proxy(n, e);
}
async function st(n) {
  return fetch(n.url, n).then((e) => e.json());
}
function it(n) {
  return Object.keys(n).length === 0;
}
var Ee = /* @__PURE__ */ ((n) => (n.GET = "GET", n.POST = "POST", n.PUT = "PUT", n.DELETE = "DELETE", n))(Ee || {});
function ct(n) {
  const e = {};
  return typeof n == "string" ? (e.url = n, e.method = Ee.GET) : typeof n == "function" ? e.func = n : (e.url = n.url, e.method = n.method, e.data = n.data, e.options = n.options), e;
}
var Z = /* @__PURE__ */ ((n) => (n.TEXT = "text", n.NUMBER = "number", n.ARRAY = "array", n.OBJECT = "object", n))(Z || {}), I = /* @__PURE__ */ ((n) => (n.fanout = "fanout", n.topic = "topic", n.headers = "headers", n.direct = "direct", n))(I || {});
const f = class {
  constructor(e, t, r) {
    p(this, "options");
    p(this, "queueName");
    p(this, "queueContext");
    p(this, "subscriptions", []);
    p(this, "operators");
    p(this, "builders", {});
    p(this, "tempData");
    p(this, "queues");
    p(this, "emitters");
    p(this, "exchangeName", "default");
    p(this, "exchangeType", I.fanout);
    p(this, "httpInfo", { url: "", func: null });
    var o;
    this.clearChannelData(), this.queues = this.setQueues(r == null ? void 0 : r.inner), (o = this.queues[e]) != null && o.subject || (this.queues[e] = {
      subject: t,
      info: null,
      tempData: "",
      track: r == null ? void 0 : r.track
    }), this.queueName = e, this.options = r;
  }
  static classForTestsOnly(e, t, r) {
    return new f(e, t, r);
  }
  get propsForTestsOnly() {
    return {
      queueName: this.queueName,
      queueContext: this.queueContext,
      subscriptions: this.subscriptions,
      operators: this.operators,
      builders: this.builders,
      tempData: this.tempData,
      queues: this.queues,
      emitters: this.emitters,
      exchangeName: this.exchangeName,
      exchangeType: this.exchangeType,
      httpInfo: this.httpInfo
    };
  }
  static publishTo(e, t) {
    f.broker.queues[e] && f.broker.queues[e].subject.next(t);
  }
  static consumeFrom(e) {
    var t;
    return (t = f.broker.queues[e]) == null ? void 0 : t.subject;
  }
  static get settings() {
    return {
      broker: f.broker,
      context: f.context
    };
  }
  scope(e) {
    return f.context.push(e), this;
  }
  static use(e, t) {
    return new f(
      e,
      new Q(20),
      t
    );
  }
  static useReplay(e, t) {
    return new f(e, new Q(20), t);
  }
  static innerUse(e, t) {
    return new f(e, new Q(20), {
      ...t,
      inner: !0
    });
  }
  stash(e, t = Z.TEXT, r = !0) {
    const o = this.queues[this.queueName];
    switch (t) {
      case Z.TEXT:
        r ? o.tempData = e : o.tempData += e;
    }
  }
  stashAndPublishWhen() {
    return "";
  }
  flushAndPublish() {
    const e = this.queues[this.queueName], t = e == null ? void 0 : e.tempData;
    t !== void 0 && this.publish(t, () => e.tempData = "");
  }
  context(e) {
    return this.queueContext = e, this.queueContext.queueName = this.queueName, this;
  }
  static getQueues() {
    return console.log("queues", f.broker.queues), f.broker.queues;
  }
  static getExchanges() {
    return f.exchanges;
  }
  assertExchange(e, t = I.fanout) {
    return this.exchangeName = e, this.exchangeType = t, this;
  }
  setQueues(e) {
    return this.queues = e ? f.broker.innerQueues : f.broker.queues, this.emitters = f.broker.emitters, this.queues;
  }
  close() {
    f.clearSubscriptions(this.queueName);
  }
  clearChannelData() {
    this.exchangeName = "default", this.operators = null, this.queueName = "", this.exchangeType = I.fanout, this.httpInfo = { url: "" };
  }
  setEndpoint(e, t = !0) {
    return this.httpInfo = ct(e), t ? this : this.httpInfo;
  }
  pushToExchange(e, t) {
    e.forEach((r) => {
      this.queues[r] ? this.queues[r].subject.next(t) : this.queues[r].subject = new Ze(t);
    });
  }
  pushToQueues(e, t) {
    e != null && e.length ? this.pushToExchange(e, t) : this.queues[this.queueName].subject.next(t);
  }
  pipeTransformers(e) {
    return Object.keys(this.builders).map((r) => {
      const o = this.builders[r];
      return o.builder(e)(o.functionBody);
    })[0];
  }
  async getHttpResult() {
    var t, r;
    let e = "";
    return ((t = this.httpInfo) == null ? void 0 : t.func) && typeof this.httpInfo.func == "function" ? e = await this.httpInfo.func() : (r = this.httpInfo) != null && r.url && (e = await st(this.httpInfo)), e;
  }
  async setMsg(e) {
    let t = e;
    const r = await this.getHttpResult();
    return r && e && (r.channelMsg = e, t = r), t;
  }
  async publish(e, t) {
    return this.pushToQueues(
      f.exchanges[this.exchangeName],
      await this.setMsg(e)
    ), t && typeof t == "function" && t(), this;
  }
  pipe(e) {
    return this.operators = e, this;
  }
  tube(e, t) {
    return this.builders[e.name] = { builder: e, functionBody: t }, this;
  }
  funnel() {
    return this;
  }
  static clearSubscriptions(e) {
    f.refs.get(e).forEach((r) => r.unsubscribe());
  }
  createStream(e) {
    return e.subject.pipe(
      et((t) => t === f.subjectOptions.INIT_VALUE)
    );
  }
  consume(e, t = !0) {
    let r = this.createStream(this.queues[this.queueName]), o;
    const s = this.operators;
    if (s && (r = r.pipe(...s)), it(this.builders) || (r = this.pipeTransformers(r)), e)
      t ? o = r.subscribe(e) : e();
    else
      return r;
    return this.subscriptions.push(o), f.refs.set(this.queueName, this.subscriptions), this.queues[this.queueName].subject;
  }
  bindExchange(e, t = I.fanout) {
    return this.exchangeName = e, this.exchangeType = t, f.exchanges[e] = f.exchanges[e] || [], f.exchanges[e].push(this.queueName), this;
  }
};
let y = f;
p(y, "INIT_VALUE", `INIT_VALUE${new Date().valueOf()}`), p(y, "_queues", {}), p(y, "broker", rt(globalThis)), p(y, "exchanges", {}), p(y, "context", []), p(y, "refs", /* @__PURE__ */ new Map()), p(y, "subjectOptions", {
  INIT_VALUE: Symbol("SUBJECT_INIT_VALUE"),
  BUFFER_SIZE: Number.POSITIVE_INFINITY,
  WINDOW_TIME: 500
});
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const ut = () => {
}, at = Object.assign, lt = Array.isArray, ft = (n) => typeof n == "function", ht = (n) => typeof n == "symbol";
let pt;
function dt(n, e = pt) {
  e && e.active && e.effects.push(n);
}
const pe = (n) => {
  const e = new Set(n);
  return e.w = 0, e.n = 0, e;
}, xe = (n) => (n.w & S) > 0, Te = (n) => (n.n & S) > 0, _t = ({ deps: n }) => {
  if (n.length)
    for (let e = 0; e < n.length; e++)
      n[e].w |= S;
}, vt = (n) => {
  const { deps: e } = n;
  if (e.length) {
    let t = 0;
    for (let r = 0; r < e.length; r++) {
      const o = e[r];
      xe(o) && !Te(o) ? o.delete(n) : e[t++] = o, o.w &= ~S, o.n &= ~S;
    }
    e.length = t;
  }
};
let j = 0, S = 1;
const ee = 30;
let v;
Symbol(process.env.NODE_ENV !== "production" ? "iterate" : "");
Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class bt {
  constructor(e, t = null, r) {
    this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], this.parent = void 0, dt(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = v, t = U;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = v, v = this, U = !0, S = 1 << ++j, j <= ee ? _t(this) : de(this), this.fn();
    } finally {
      j <= ee && vt(this), S = 1 << --j, v = this.parent, U = t, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    v === this ? this.deferStop = !0 : this.active && (de(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function de(n) {
  const { deps: e } = n;
  if (e.length) {
    for (let t = 0; t < e.length; t++)
      e[t].delete(n);
    e.length = 0;
  }
}
let U = !0;
function _e(n, e) {
  let t = !1;
  j <= ee ? Te(n) || (n.n |= S, t = !xe(n)) : t = !n.has(v), t && (n.add(v), v.deps.push(n), process.env.NODE_ENV !== "production" && v.onTrack && v.onTrack(Object.assign({ effect: v }, e)));
}
function ve(n, e) {
  const t = lt(n) ? n : [...n];
  for (const r of t)
    r.computed && be(r, e);
  for (const r of t)
    r.computed || be(r, e);
}
function be(n, e) {
  (n !== v || n.allowRecurse) && (process.env.NODE_ENV !== "production" && n.onTrigger && n.onTrigger(at({ effect: n }, e)), n.scheduler ? n.scheduler() : n.run());
}
new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((n) => n !== "arguments" && n !== "caller").map((n) => Symbol[n]).filter(ht)
);
function z(n) {
  const e = n && n.__v_raw;
  return e ? z(e) : n;
}
function yt(n) {
  U && v && (n = z(n), process.env.NODE_ENV !== "production" ? _e(n.dep || (n.dep = pe()), {
    target: n,
    type: "get",
    key: "value"
  }) : _e(n.dep || (n.dep = pe())));
}
function mt(n, e) {
  n = z(n), n.dep && (process.env.NODE_ENV !== "production" ? ve(n.dep, {
    target: n,
    type: "set",
    key: "value",
    newValue: e
  }) : ve(n.dep));
}
var ke;
class gt {
  constructor(e, t, r, o) {
    this._setter = t, this.dep = void 0, this.__v_isRef = !0, this[ke] = !1, this._dirty = !0, this.effect = new bt(e, () => {
      this._dirty || (this._dirty = !0, mt(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = r;
  }
  get value() {
    const e = z(this);
    return yt(e), (e._dirty || !e._cacheable) && (e._dirty = !1, e._value = e.effect.run()), e._value;
  }
  set value(e) {
    this._setter(e);
  }
}
ke = "__v_isReadonly";
function wt(n, e, t = !1) {
  let r, o;
  const s = ft(n);
  s ? (r = n, o = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : ut) : (r = n.get, o = n.set);
  const i = new gt(r, o, s || !o, t);
  return process.env.NODE_ENV !== "production" && e && !t && (i.effect.onTrack = e.onTrack, i.effect.onTrigger = e.onTrigger), i;
}
const Oe = (n) => n.charAt(0).toUpperCase() + n.slice(1), St = /* @__PURE__ */ g({
  __name: "Channels",
  props: {
    content: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const e = { consumers: {}, publishers: {} }, t = qe([]), r = y.getQueues();
    return Object.keys(r).forEach((o) => {
      const s = r[o].devtools.channels;
      Object.keys(s).forEach((i) => {
        const c = i;
        e[c][o] = e[c][o] || {}, e[c][o] = { queue: o, content: s[i] };
      });
    }), Object.keys(e).forEach((o) => {
      t.push({ type: Oe(o), content: e[o] });
    }), (o, s) => (d(), V(oe, { items: t }, null, 8, ["items"]));
  }
}), Et = { class: "components" }, xt = { class: "components__zone" }, Tt = ["onClick", "onMouseleave", "onMouseover"], kt = { class: "components__zone__item_sup" }, Ot = { class: "components__info" }, It = /* @__PURE__ */ g({
  __name: "Components",
  props: {
    content: {
      type: Object,
      required: !0
    }
  },
  emits: ["component-info"],
  setup(n, { emit: e }) {
    const t = n, r = q({}), o = q({}), s = q([{}]);
    Pe(() => {
      const a = t.content.components;
      r.value = { ...r.value, ...a };
    });
    const i = (a) => {
      const h = a.info.instance.channelx;
      s.value = Object.keys(h).map((b, E) => ({
        type: Oe(b),
        content: h[b]
      })), s.value.push({ type: "Http", content: a }), s.value.push({ type: "Diagrams", content: a }), o.value = a, e("component-info", a);
    }, c = (a) => {
      if (!a)
        return;
      a.el.classList.add("overlay");
      const h = a.el.getBoundingClientRect();
      a.el.setAttribute(
        "data-component-info",
        a.componentName.toUpperCase() + " ( " + (h.width % 1 ? h.width.toFixed(2) : h.width) + " X " + (h.height % 1 ? h.height.toFixed(2) : h.height) + " ) "
      );
    }, l = (a) => {
      a.el.classList.remove("overlay"), a.el.removeAttribute("data-component-info");
    };
    return (a, h) => (d(), _("div", Et, [
      u("div", xt, [
        (d(!0), _(F, null, M(r.value, (b, E, k) => (d(), _("div", {
          class: ye(["components__zone__item", { "components__zone__item--active": b === o.value }]),
          key: E,
          onClick: (C) => i(b),
          onMouseleave: (C) => l(b.info),
          onMouseover: (C) => c(b.info)
        }, [
          u("div", null, [
            Ae(P(b.info.componentName), 1),
            u("sup", kt, P(b.uid), 1)
          ])
        ], 42, Tt))), 128))
      ]),
      u("div", Ot, [
        A(oe, { items: s.value }, null, 8, ["items"])
      ])
    ]));
  }
});
const T = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, o] of e)
    t[r] = o;
  return t;
}, jt = /* @__PURE__ */ T(It, [["__scopeId", "data-v-d5f43e71"]]), qt = ["onClick"], Pt = /* @__PURE__ */ g({
  __name: "Consumers",
  props: {
    content: {
      type: Array,
      required: !0
    }
  },
  setup(n) {
    const e = (t) => {
      console.log("item", t);
    };
    return (t, r) => (d(!0), _(F, null, M(n.content, (o) => (d(), _("div", null, [
      u("div", {
        onClick: (s) => e(o),
        class: "scope__boxes"
      }, P((o == null ? void 0 : o.queue) || o), 9, qt)
    ]))), 256));
  }
});
const At = /* @__PURE__ */ T(Pt, [["__scopeId", "data-v-db6e940d"]]);
const Ct = {}, Nt = /* @__PURE__ */ u("li", {
  head: "",
  on: "1"
}, "User", -1), Dt = /* @__PURE__ */ u("li", {
  head: "",
  on: "2"
}, "Page", -1), $t = /* @__PURE__ */ u("li", {
  head: "",
  on: "3"
}, "Service Worker", -1), Ut = /* @__PURE__ */ u("li", {
  head: "",
  on: "4"
}, "Server", -1), Vt = /* @__PURE__ */ u("li", {
  head: "",
  on: "5"
}, "Push Service", -1), Rt = /* @__PURE__ */ u("li", {
  from: "1",
  to: "4"
}, "Navigation", -1), Bt = /* @__PURE__ */ u("li", {
  back: "",
  from: "4",
  to: "2"
}, "Page Load", -1), Ft = /* @__PURE__ */ u("li", {
  from: "2",
  to: "3"
}, "register()", -1), Mt = /* @__PURE__ */ u("li", { on: "3" }, "Register Push Handler", -1), Wt = /* @__PURE__ */ u("li", { on: "3" }, "Register Notification Click Handler", -1), zt = /* @__PURE__ */ u("li", {
  back: "",
  from: "3",
  to: "2"
}, "success", -1), Lt = /* @__PURE__ */ u("li", {
  back: "",
  from: "2",
  to: "1"
}, "Notification Permission Prompt", -1), Ht = /* @__PURE__ */ u("li", { on: "3" }, "Worker is suspended", -1), Qt = /* @__PURE__ */ u("li", { on: "1" }, "permission granted", -1), Yt = /* @__PURE__ */ u("li", {
  from: "1",
  to: "2"
}, "success", -1), Gt = /* @__PURE__ */ u("li", { on: "2" }, "endpoint and key generated", -1), Xt = /* @__PURE__ */ u("li", {
  from: "2",
  to: "4"
}, "send endpoint & key", -1), Jt = /* @__PURE__ */ u("li", { on: "2" }, "page blur or closed", -1), Kt = /* @__PURE__ */ u("li", { break: "" }, "*time passes*", -1), Zt = /* @__PURE__ */ u("li", { on: "4" }, "event!", -1), en = /* @__PURE__ */ u("li", {
  from: "4",
  to: "5"
}, "send message", -1), tn = /* @__PURE__ */ u("li", {
  back: "",
  from: "5",
  to: "3"
}, "push event", -1), nn = /* @__PURE__ */ u("li", { on: "3" }, "worker is resumed", -1), rn = /* @__PURE__ */ u("li", {
  back: "",
  from: "3",
  to: "1"
}, "display notification", -1), on = /* @__PURE__ */ u("li", { on: "1" }, "click on notification", -1), sn = /* @__PURE__ */ u("li", {
  from: "1",
  to: "3"
}, "notificationclick event", -1), cn = /* @__PURE__ */ u("li", {
  back: "",
  from: "3",
  to: "1"
}, "focus tab / open page", -1), un = [
  Nt,
  Dt,
  $t,
  Ut,
  Vt,
  Rt,
  Bt,
  Ft,
  Mt,
  Wt,
  zt,
  Lt,
  Ht,
  Qt,
  Yt,
  Gt,
  Xt,
  Jt,
  Kt,
  Zt,
  en,
  tn,
  nn,
  rn,
  on,
  sn,
  cn
];
function an(n, e) {
  return d(), _("ol", null, un);
}
const ln = /* @__PURE__ */ T(Ct, [["render", an]]), fn = /* @__PURE__ */ g({
  __name: "Diagrams",
  setup(n) {
    return (e, t) => (d(), V(ln));
  }
}), hn = /* @__PURE__ */ g({
  __name: "Http",
  props: {
    content: {
      type: Array,
      required: !0
    }
  },
  setup(n) {
    const e = n;
    return Ce(() => {
      console.log("props", e);
    }), (t, r) => "http";
  }
}), pn = ["onClick"], dn = /* @__PURE__ */ g({
  __name: "Publishers",
  props: {
    content: {
      type: Array,
      required: !0
    }
  },
  setup(n) {
    const e = (t) => {
      console.log("item", t);
    };
    return (t, r) => (d(!0), _(F, null, M(n.content, (o) => (d(), _("div", null, [
      u("div", {
        onClick: (s) => e(o),
        class: "scope__boxes"
      }, P((o == null ? void 0 : o.queue) || o), 9, pn)
    ]))), 256));
  }
});
const _n = /* @__PURE__ */ T(dn, [["__scopeId", "data-v-798c746b"]]), vn = { Channels: St, Components: jt, Consumers: At, Publishers: _n, Diagrams: fn, Http: hn }, bn = { class: "tabs__content" }, yn = /* @__PURE__ */ g({
  __name: "Tab",
  props: {
    type: {
      type: String,
      required: !0
    },
    content: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const e = n, t = vn, r = Ne(() => t[e.type]), o = (s) => {
      e.content.components[s.uid], console.log("component", s);
    };
    return (s, i) => (d(), _("div", bn, [
      (d(), V(De, null, [
        (d(), V($e(O(r)), {
          onComponentInfo: o,
          content: n.content
        }, null, 40, ["content"]))
      ], 1024))
    ]));
  }
});
const mn = /* @__PURE__ */ T(yn, [["__scopeId", "data-v-3effb95f"]]), gn = { class: "tabs__header" }, wn = ["onClick"], Sn = /* @__PURE__ */ g({
  __name: "TabsHeader",
  props: {
    items: {
      type: Array,
      required: !0
    },
    activeTab: {
      type: Number,
      required: !0
    }
  },
  emits: ["set-active-tab"],
  setup(n, { emit: e }) {
    const t = (r) => {
      console.log("index", r), e("set-active-tab", r);
    };
    return (r, o) => (d(), _("div", gn, [
      (d(!0), _(F, null, M(n.items, (s, i) => (d(), _("div", {
        key: i,
        class: ye(["tabs__header__tab", { "tabs__header__tab--active": i === n.activeTab }]),
        onClick: (c) => t(i)
      }, P(s == null ? void 0 : s.toUpperCase()), 11, wn))), 128))
    ]));
  }
});
const En = { class: "tabs" }, xn = /* @__PURE__ */ g({
  __name: "Tabs",
  props: {
    items: {
      type: Array,
      required: !0
    }
  },
  setup(n) {
    const e = n, t = q(0), r = (s) => {
      t.value = s;
    }, o = wt(
      () => {
        var s;
        return ((s = e.items) == null ? void 0 : s[t.value]) || e.items[0];
      }
    );
    return (s, i) => (d(), _("div", En, [
      A(O(Sn), {
        items: n.items.map((c) => c.type),
        "active-tab": t.value,
        onSetActiveTab: r
      }, null, 8, ["items", "active-tab"]),
      A(O(mn), {
        content: O(o).content,
        type: O(o).type
      }, null, 8, ["content", "type"])
    ]));
  }
});
const oe = /* @__PURE__ */ T(xn, [["__scopeId", "data-v-2bb5b1be"]]), Tn = { class: "devtools-container bottom" }, kn = /* @__PURE__ */ g({
  __name: "Devtool",
  setup(n) {
    const e = q([{}]);
    return y.innerUse("devtool").consume((t) => {
      console.log("devtool", t), setTimeout(() => {
        e.value = [
          { type: "Components", content: t.devtools },
          { type: "Channels", content: t.devtools },
          { type: "Broker", content: t.devtools }
        ];
      }, 0);
    }), (t, r) => (d(), _("div", Tn, [
      A(oe, { items: e.value }, null, 8, ["items"])
    ]));
  }
});
const On = /* @__PURE__ */ T(kn, [["__scopeId", "data-v-0adb089f"]]), In = /* @__PURE__ */ g({
  __name: "App",
  setup(n) {
    return (e, t) => (d(), _("div", null, [
      A(On)
    ]));
  }
}), jn = Ue(In);
jn.mount("#app");
