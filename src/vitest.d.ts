import "vitest";
import { ToJsonOutput } from "@core/@shared/domain/validators/notification.interface";

interface CustomMatchers<R = unknown> {
  notificationContainsErrorMessages: (expected: ToJsonOutput) => R;
}

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
}

declare global {
  namespace Vitest {
    interface Expect {
      notificationContainsErrorMessages(expected: ToJsonOutput): this;
    }
  }
}
