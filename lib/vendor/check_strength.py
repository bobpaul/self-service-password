#!/usr/bin/python2
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(sys.argv[0]), 'zxcvbn-python'))

import zxcvbn as zxcvbn

result = zxcvbn.zxcvbn(sys.argv[1])

print result['score']
